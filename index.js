const express = require('express');
var fs = require('fs');

const app = express();
const port = 3000;
const userDataFile = './data/user.json'

const users = require(userDataFile);
const usersList = Object.values(users)[0];

const userChangeableProperties = [
    "username",
    "firstname",
    "lastname",
    "email",
    "birth_date",
    "gender",
    "description",
    // photo
    "password"
]

function findUserById(id) {
    for ( let i = 0 ; i < usersList.length ; i++) {
        if (usersList[i].id == id) {
            return usersList[i]
        }
    }
    throw new Error ("User not found")
}

function sendUserNotFoundError(res) {
    res.status = 404
    res.send("User not found")
}

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
    console.log(userId)
    try {
        var user = findUserById(userId)
    } catch {
        sendUserNotFoundError(res)
    }
    res.send(user)
});


app.use(express.urlencoded({extended: true}))
app.post('/updateUser/:userId', (req, res) => {
    const userId = req.params['userId']

    try {
        var user = findUserById(userId)
    } catch {
        sendUserNotFoundError(res)
    }

    updatedUser = updateUserProperties(user, req.body)
    
    try { saveUsersData() }
    catch {
        res.status = 500
        res.send("User was not updated")
    }
    
    res.json(updatedUser)
});

function updateUserProperties(user, properties) {
    const propertiesList = Object.entries(properties);
    propertiesList.map((keyValue) => {
        userChangeableProperties.map(userChangeableProperty => {
            if (keyValue[0] == userChangeableProperty) {
                user[keyValue[0]] = keyValue[1]
            }
        })
    })
    return user
}

function saveUsersData() {
    fs.writeFile(
        userDataFile,
        JSON.stringify({users: usersList}),
        (err) => {
            throw err
        }
    )
}


// make server listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});