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

// post routes

app.post('/teachers', (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const classes = req.query.classes;
    db.collection("teacher").add({firstName, lastName, classes}).then(resp => res.sendStatus(200).end());
})

app.post('/students', (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const classes = req.query.classes;
    const birthday = req.query.birthday;
    db.collection("student").add({firstName, lastName, classes, birthday}).then(resp => res.sendStatus(200).end());
})

app.post('/classes', (req, res) => {
    const name = req.query.name;
    const students = req.query.students;
    const teacherID = req.query.teacherID;
    db.collection("class").add({name, students, teacherID}).then(resp => res.sendStatus(200).end());
})

app.post('/events', (req, res) => {
    const name = req.query.name;
    const date = req.query.date;
    const desc = req.query.desc;
    db.collection("event").add({name, date, desc}).then(resp => res.sendStatus(200).end());
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