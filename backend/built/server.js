const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
// TODO: move routes to separate file probably
router.get('/', (req, res) => {
    res.json({ message: 'bepis' });
});
app.use('/api', router);
app.listen(3000, () => {
    console.log('Server now running on http://localhost:3000');
});
