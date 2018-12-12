var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
// TODO: move routes to separate file probably
router.get('/', function (req, res) {
    res.json({ message: 'bepis' });
});
app.use('/api', router);
app.listen(3000, function () {
    console.log('Server now running on http://localhost:3000');
});
