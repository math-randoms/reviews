const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../database/MongoDB/index.js');
const path = require('path');
const router = require('./router.js');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', router);

const port = 3004;

app.listen(port, () => console.log(`Server up on ${port}`));
