require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

const SESSION_KEY = process.env.SESSION_KEY;
const SESSION_DURATION = parseInt(process.env.SESSION_DURATION);
const DB_CONN_URL = process.env.LOCAL_DB_CONN_URL;

// Determine port
const port = process.env.PORT || 3000;

const app = express();

app.use(session({
    resave: false,
    saveUninitialized:true,
    secret: SESSION_KEY,
    cookie: { 
        httpOnly: false,
        secure:false,
        maxAge: SESSION_DURATION
     },
    store: new (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose, // optional
        host: 'localhost', // optional
        port: 27017, // optional
        db: 'petitionpoint', // optional
        collection: 'sessions', // optional
        unset: 'destroy',
    })
}));
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(logger('dev'))



// Open connection to db
mongoose.connect(DB_CONN_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Import Routes
const user = require('./routes/user');
const petition = require('./routes/petition');
const turnin = require('./routes/turnin');

// Declare routes
app.use('/user', user);
app.use('/petition', petition);
app.use('/turnin', turnin);

// Serve the React application
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.listen(port, () => {
//     console.log(`API listening on port: ${port}`);
// });

module.exports = app;