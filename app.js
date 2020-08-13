const express = require('express');
const mongoose = require('mongoose');
const heroes = require('./routes/heroes');
const home = require('./routes/home');
const users = require('./routes/users');
const cors =require("cors")
const authenticator = require('./middleware/authenticator');
const mailer = require('./middleware/emailjob');
const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors());
app.use(authenticator);
app.use(mailer);
app.use('/api/heroes', heroes);
app.use('/api/users', users);
app.use('/', home);

mongoose
    .connect("mongodb://localhost/herodb", {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => {
        //if one line can ignore {}
        console.log("Connected to Database Successfully...");
    })
    .catch(err => console.log("unable to connect Database... :", err));


app.listen(PORT, function () {
    console.log('Listning on Port :' + PORT);
})