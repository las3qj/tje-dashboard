const express = require('express');
const cors = require('cors');
const db = require('./firebase');
const app = express();
app.use(express.json());
app.use(cors({origin: true}));
const port = 8000;

const testTeacherCollection = async () => {
    const snapshot = await db.collection("teacher").get();
    const teachers = [];
    snapshot.forEach(doc => {
        const teacher = {...doc.data(), id: doc.id};
        console.log(teacher);
        teachers.push(teacher);
    });
    return teachers;
};

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/teacherTest', (req, res) => {
    testTeacherCollection().then(resp => res.json(resp));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})