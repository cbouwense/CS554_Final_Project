import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import morgan = require('morgan');
import { User } from './models/user';
import { constructRoutes } from './routes';

const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost/mothballs')
    .then(() => console.log('[mongoose]: connection successful'))
    .catch(err => console.log(`[mongoose]: ${err}`));

app.use(bodyParser.json());
app.use(morgan('dev'));

// TODO: move routes to separate file probably
router.get('/', (req, res) => {

    // testing out user creation

    const matt = new User({
        username: 'mrota',
        password: '123',
    });

    matt.save((error) => {
        if (error) console.log(`failed creating user: ${error}`);
        else console.log('successfully created the user');
    });

    User.find({}, (err, docs) => {
        console.log(docs);
    });

    res.json({ message: 'bepis' });
});

constructRoutes(router);

app.use('/api', router);

app.listen(3000, () => {
    console.log('🚀 http://localhost:3000');
});
