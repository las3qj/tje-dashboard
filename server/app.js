const express = require('express');
const cors = require('cors');
const db = require('./firebase');
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
const port = 8000;


//get method

const get = async (collection, id) => {
    const ref = db.collection(collection).doc(id);
    const doc = await ref.get();
    if(!doc.exists) {
        console.log('no such doc');
        return undefined;
    }
    return {...doc.data()};
}

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
        const each = { ...doc.data() };
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
            .json({
            role: "admin",
            id: accessCode,
            firstName: admin.data().firstName,
            lastName: admin.data().lastName,
            })
            .end();
        } else if (teacher.exists) {
        res
            .json({
            role: "teacher",
            id: accessCode,
            firstName: teacher.data().firstName,
            lastName: teacher.data().lastName,
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
    const address = req.body.address;
    const birthday = req.body.birthday;
    const phone = req.body.phone;
    db.collection("teacher").doc(id).set({ firstName, lastName, classes, birthday, address, phone }).then(resp => res.sendStatus(200).end());
})

app.put('/students', (req, res) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const classes = req.body.classes;
    const address = req.body.address;
    const birthday = req.body.birthday;
    const phone = req.body.phone;
    db.collection("student").doc(id).set({ firstName, lastName, classes, birthday, address, phone }).then(resp => res.sendStatus(200).end());
})

app.put('/classes', (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const name = req.body.name;
    const students = req.body.students;
    const teacherID = req.body.teacherID;
    console.log({id, name, students, teacherID});
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

app.get('/class-page', async (req, res) => {
    const id = req.query.id;
    const [myClass, studentMap] = await Promise.all([get('class', id), getMap('student')]);
    res.json({myClass, studentMap});
})

app.put('/class-page/add-student', async (req, res) => {
    const id = req.body.id; 
    const student = req.body.student;
    const newClass = await get('class', id);
    newClass.students.push(student);

    const newStudent = await get('student', student.studentID);
    newStudent.classes.push(id);

    const [resp1, resp2] = await Promise.all([db.collection('class').doc(id).set(newClass), 
        db.collection('student').doc(student.studentID).set(newStudent)]);
    res.sendStatus(200).end();
})

app.put('/class-page/delete-student', async (req, res) => {
    const id = req.body.id;
    const studentID = req.body.studentID;
    const newClass = await get('class', id);
    const index = newClass.students.findIndex(stu => stu.studentID === studentID);
    newClass.students.splice(index, 1);
    db.collection('class').doc(id).set(newClass).then(resp => res.sendStatus(200).end());
})

app.put('/class-page/change-student-grade', async (req, res) => {
    const id = req.body.id;
    const student = req.body.student;
    const newClass = await get('class', id);
    const index = newClass.students.findIndex(stu => stu.studentID === student.studentID);
    newClass.students[index].grade = student.grade;
    db.collection('class').doc(id).set(newClass).then(res.sendStatus(200).end());
})

app.put('/class-page/change-class-info', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const teacherID = req.body.teacherID;
    const newClass = await get('class', id);
    newClass.name = name;
    newClass.teacherID = teacherID;
    db.collection('class').doc(id).set(newClass).then(res.sendStatus(200).end());
})
