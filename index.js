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
    const randomUserIndex = Math.floor(Math.random() * usersList.length)
    res.send(usersList[randomUserIndex])
});

app.get('/getById/:userId', (req, res) => {
    const userId = req.params['userId']
    if (userId <= (usersList.length)) {
        usersList.map( (user) => {
            if (user["id"] == userId) {
                res.send(user)
            }
        })
    } else {
        res.status(404)
        res.send("ERROR: User does not exist")
    }
});

// make server listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});