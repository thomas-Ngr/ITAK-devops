const express = require('express');
const app = express();
const port = 3000;

let users = require('./data/user.json');

// simple root request to validate it works
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// GET all users data
app.get('/getAll', (req, res) => {
    res.send(users)
});

// make server listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})