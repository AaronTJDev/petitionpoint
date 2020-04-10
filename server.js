const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

// Determine port
const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(logger('dev'));

// Open connection to db
mongoose.connect(`mongodb://localhost:27017/petitionpoint`, { useNewUrlParser: true, useUnifiedTopology: true });

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
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`API listening on port: ${port}`);
});