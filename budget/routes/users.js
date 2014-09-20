var express = require('express');
var router = express.Router();
var request = require('request');

router.put('/test', function(req, res) {
    console.log('req data: \n');
    console.log(req.body.data);
});

module.exports = router;



