'use strict';
//Load server node modules
var express = require('express');
var bodyParser = require('body-parser');

//Run express (http)
var app = express();

//Load routes (http)

var routes_example = require('./routes/example');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS

//Routes prefixes
app.use('/example/', routes_example);

//Export module
module.exports = app;