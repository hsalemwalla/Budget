var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/userPoints', function(req, res) {
    console.log('req data points: ');
    console.log(req.body.data);
    res.sendStatus(200);
});

router.get('/question', function(req, res) {
    console.log('req data question: ');
    console.log(req.body.data);
    res.sendStatus(200);
});

router.get('/answers', function(req, res) {
    console.log('req data answers: ');
    console.log(req.body.data);
    res.sendStatus(200);
});

router.post('/postAnswer', function(req, res) {
    console.log('req data: ');
    console.log(req.body.data);
    res.status(200).end();
});

module.exports = router;



