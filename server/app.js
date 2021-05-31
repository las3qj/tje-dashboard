const express = require('express');
const cors = require('cors');
const db = require('./firebase');
const app = express();
app.use(express.json());
app.use(cors({origin: true}));
const port = 8000;

const getAllTeachers = async () => {
    const snapshot = await db.collection("teacher").get();
    const teachers = [];
    snapshot.forEach(doc => {
        const teacher = {...doc.data(), id: doc.id};
        teachers.push(teacher);
    });
    return teachers;
}

const getAllClasses = async () => {
    const snapshot = await db.collection("class").get();
    const classes = [];
    snapshot.forEach(doc => {
        const c = {...doc.data(), id: doc.id};
        classes.push(c);
    });
    return classes;
}

const getAllStudents = async () => {
    const snapshot = await db.collection("student").get();
    const students = [];
    snapshot.forEach(doc => {
        const student = {...doc.data(), id: doc.id};
        students.push(student);
    });
    return students;
}

const getAllEvents = async () => {
    const snapshot = await db.collection("event").get();
    const events = [];
    snapshot.forEach(doc => {
        const event = {...doc.data(), id: doc.id};
        events.push(event);
    });
    return events;
}

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/teachers', (req, res) => {
    getAllTeachers().then(resp => res.json(resp));
})

app.get('/students', (req, res) => {
    getAllStudents().then(resp => res.json(resp));
})

app.get('/classes', (req, res) => {
    getAllClasses().then(resp => res.json(resp));
})

app.get('/events', (req, res) => {
    getAllEvents().then(resp => res.json(resp));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})