var express = require('express');
var router = express.Router();
var request = require('request');

router.put('/test', function(req, res) {
    console.log('hello');
});

module.exports = router;



