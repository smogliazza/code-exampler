'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExampleSchema = Schema({ //define collection structure
    created_at: { type: Date, default: Date.now()},
    updated_at: Date,
});

module.exports = mongoose.model('Example', ExampleSchema);