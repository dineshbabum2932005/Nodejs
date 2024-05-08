const express = require('express');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/EventbookingDB');
const db = mongoose.connection;

db.on('error', () => {
    console.log("Error on connection");
});
db.once('open', () => {
    console.log("Connected Successfully");
});

// Create a schema for user data
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Create an Express application
const app = express();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Create a new user document
    const newUser = new User({
        email: email,
        password: password
    });

    // Save the user to the database using Promises
    newUser.save()
        .then(() => {
            res.send('User data saved successfully');
        })
        .catch(err => {
            console.error(err);
            res.send('Error saving user data');
        });
});

// Route to serve HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// Start the server
const port = 4200;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});