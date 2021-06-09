'use strict';

var express = require('express');
var ExampleController = require('../controllers/example');

var router = express.Router();

router.get('/get', ExampleController.get);
router.post('/save', ExampleController.save);
router.put('/update', ExampleController.update);

module.exports = router;