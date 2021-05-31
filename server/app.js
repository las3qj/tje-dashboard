const express = require('express');
const cors = require('cors');
const db = require('./firebase');
const app = express();
app.use(express.json());
app.use(cors({origin: true}));
const port = 8000;

// getAll method

const getAll = async (collection) => {
    const snapshot = await db.collection(collection).get();
    const all = []
    snapshot.forEach(doc => {
        const each = {...doc.data(), id: doc.id};
        all.push(each);
    });
    return all;
}

app.get('/', (req, res) => {
    res.send('Hello World!');
})

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

app.post('/teacher', (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const classes = req.query.classes;
    db.collection("teacher").add({firstName, lastName, classes})
    postTeacher(firstName, lastName, classes).then(resp => res.sendStatus(200).end());
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})