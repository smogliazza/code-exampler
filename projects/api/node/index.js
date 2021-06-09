'use strict'; //Strict mode for better practices

var mongoose = require('mongoose'); //load mongoose module
var app = require('./app');
var port = 80;

mongoose.set('useFindAndModify', false); // Disable old funtions
mongoose.Promise = global.Promise; //prevent fails
mongoose.connect('mongodb://localhost:27017/database', {useNewUrlParser: true}) // Connection |  useNewUrlPraser for new sintax and funtions
    .then(()=>{
        console.log("Database: Connected");

        //Create server and set HTTP listener
        app.listen(port, ()=>{
            console.log("Server running on http://localhost:"+port);
        });
        
    });