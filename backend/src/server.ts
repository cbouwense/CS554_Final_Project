const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
import {User} from './models/user';

const app = express();
const router = express.Router();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mothballs')
	.then(() => console.log('[mongoose]: connection successful'))
	.catch((err) => console.log(`[mongoose]: ${err}`))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// TODO: move routes to separate file probably
router.get('/', (req, res) => { 
	
	// testing out user creation
	
	const matt = new User({
		username: "mrota",
		password: "123"
	});
	
	matt.save((error) => {
		if (error) console.log(`failed creating user: ${error}`)
		else console.log("successfully created the user")
	});

	User.find({}, function(err, docs) {
		console.log(docs);
	});

	res.json({ message: 'bepis' });
});

app.use('/api', router);



app.listen(3000, () => {
	console.log('Server now running on http://localhost:3000');
});