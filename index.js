/* eslint no-console: 0 */
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const utilities = require('./utilities');

require('dotenv').config();

const app = express();
const logger = require('./logger')(app);
const port = process.env.PORT;

app.use(bodyParser.json({
    limit: '50mb'
}));

mongoose.connect(process.env.CONNSTRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    }
});
mongoose.Promise = global.Promise;

global.logger = logger;

const models = require('./models')();

app.listen(port, () => {
    console.log('Application started at PORT ' + port);
});

if (!fs.existsSync(path.join(__dirname, 'logs'))) {
    fs.mkdirSync(path.join(__dirname, 'logs'));
}

require('./routes')(app);

exports = module.exports = app;
