const express = require('express');
const cors = require('cors');
const db = require('./firebase');
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
const port = 8000;

// getAll method

const getAll = async (collection) => {
    const snapshot = await db.collection(collection).get();
    const all = []
    snapshot.forEach(doc => {
        const each = { ...doc.data(), id: doc.id };
        all.push(each);
    });
    return all;
}

//getMap method

const getMap = async (collection) => {
    const snapshot = await db.collection(collection).get();
    const map = {};
    snapshot.forEach(doc => {
        const each = {...doc.data()};
        map[doc.id] = each;
    });
    return map;
}

// dummy home route

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// getAll routes

app.get('/teachers', (req, res) => {
    getAll("teacher").then(resp => res.json(resp));
})

app.get('/students', (req, res) => {
    getAll("student").then(resp => res.json(resp));
})

app.get('/classes', (req, res) => {
    getAll("class").then(resp => res.json(resp));
})

app.get('/events', (req, res) => {
    getAll("event").then(resp => res.json(resp));
})

// getMap routes

app.get('/teachers/map', (req, res) => {
    getMap('teacher').then(resp => res.json(resp));
})

app.get('/students/map', (req, res) => {
    getMap('student').then(resp => res.json(resp));
})

app.get('/classes/map', (req, res) => {
    getMap('class').then(resp => res.json(resp));
})

app.get('/events/map', (req, res) => {
    getMap('event').then(resp => res.json(resp));
})

// get user permissions route

app.get("/user", async (req, res) => {
    const uid = req.query.uid;

    const user = await db.collection("user").doc(uid).get();
    if (!user.exists) {
        res.send({ role: "none" }).end();
    } else {
        const accessCode = user.data().accessCode;

        const teacher = await db.collection("teacher").doc(accessCode).get();
        const admin = await db.collection("admin").doc(accessCode).get();
        if (admin.exists) {
        res
            .send({
            role: "admin",
            adminID: accessCode,
            firstName: admin.firstName,
            lastName: admin.lastName,
            })
            .end();
        } else if (teacher.exists) {
        res
            .json({
            role: "teacher",
            teacherID: accessCode,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            })
            .end();
        } else {
        res.send({ role: "none" }).end();
        }
    }
});

// post routes

app.post('/teachers', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const classes = req.body.classes;
    const birthday = req.body.birthday;
    const address = req.body.address;
    const phone = req.body.phone
    db.collection("teacher").add({ firstName, lastName, classes, birthday, address, phone }).then(resp => res.sendStatus(200).end());
})

app.post('/students', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const classes = req.body.classes;
    const birthday = req.body.birthday;
    const address = req.body.address;
    const phone = req.body.phone
    db.collection("student").add({ firstName, lastName, classes, birthday, address, phone }).then(resp => res.sendStatus(200).end());
})

app.post('/classes', (req, res) => {
    const name = req.body.name;
    const students = req.body.students;
    const teacherID = req.body.teacherID;
    db.collection("class").add({ name, students, teacherID }).then(resp => res.sendStatus(200).end());
})

app.post('/events', (req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const desc = req.body.desc;
    db.collection("event").add({ name, date, desc }).then(resp => res.sendStatus(200).end());
})

app.post("/users", (req, res) => {
    const uid = req.body.uid;
    const email = req.body.email
    const accessCode = req.body.accessCode;
    db.collection("user").doc(uid).set({accessCode, email})
    .then((resp) => res.sendStatus(200).end())
})

// delete routes

app.delete('/teachers', (req, res) => {
    const id = req.query.id;
    db.collection("teacher").doc(id).delete().then(resp => res.sendStatus(200).end());
})

app.delete('/students', (req, res) => {
    const id = req.query.id;
    db.collection("student").doc(id).delete().then(resp => res.sendStatus(200).end());
})

app.delete('/classes', (req, res) => {
    const id = req.query.id;
    db.collection("class").doc(id).delete().then(resp => res.sendStatus(200).end());
})

app.delete('/events', (req, res) => {
    const id = req.query.id;
    db.collection("event").doc(id).delete().then(resp => res.sendStatus(200).end());
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})


// put routes

app.put('/teachers', (req, res) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const classes = req.body.classes;
    db.collection("teacher").doc(id).set({ firstName, lastName, classes }).then(resp => res.sendStatus(200).end());
})

app.put('/students', (req, res) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const classes = req.body.classes;
    const birthday = req.body.birthday;
    db.collection("student").doc(id).set({ firstName, lastName, classes, birthday }).then(resp => res.sendStatus(200).end());
})

app.put('/classes', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const students = req.body.students;
    const teacherID = req.body.teacherID;
    db.collection("class").doc(id).set({ name, students, teacherID }).then(resp => res.sendStatus(200).end());
})

app.put('/events', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const date = req.body.date;
    const desc = req.body.desc;
    db.collection("event").doc(id).set({ name, date, desc }).then(resp => res.sendStatus(200).end());
})

// composite routes

app.get('/class-dash', async (req, res) => {
    const [classes, studentMap, teacherMap] = await Promise.all([getAll('class'), getMap('student'), getMap('teacher')]);
    res.json({classes, studentMap, teacherMap});
})