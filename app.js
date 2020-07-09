const express = require('express');
const heroes = require('./routes/heroes');
const home = require('./routes/home');
const authenticator = require('./middleware/authenticator');
const mailer = require('./middleware/emailjob');
const app = express();
const PORT = 5000;

app.use(express.json());

app.use(authenticator);
app.use(mailer);
app.use('/api/heroes',heroes);
app.use('/',home);


app.listen(PORT, function () {
    console.log('Listning on Port :' + PORT);
})