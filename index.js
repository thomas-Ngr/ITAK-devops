const express = require('express');
const app = express();
const port = 3000;

const users = require('./data/user.json');
const usersList = Object.values(users)[0];

// simple root request to validate it works
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// GET all users data
app.get('/getAll', (req, res) => {
    res.json({ users: usersList})
});

// GET one random user
app.get('/getOne', (req, res) => {
    let randomUserIndex = Math.floor(Math.random() * usersList.length)
    res.send(usersList[randomUserIndex])
});

// make server listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});