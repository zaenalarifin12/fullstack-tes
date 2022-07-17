require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var gameRouter = require('./routes/game');

const { authenticated } = require("./middleware/auth");


var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRouter);
app.use('/game', authenticated, gameRouter);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.listen(process.env.PORT || 5000, () => console.log(`run in port ${process.env.PORT}`))
module.exports = app;
