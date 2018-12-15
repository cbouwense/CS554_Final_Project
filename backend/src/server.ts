import * as dotenv from 'dotenv';
dotenv.config();

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import morgan = require('morgan');
import { constructRoutes } from './routes';

const app = express();

mongoose.connect('mongodb://localhost/mothballs', { useNewUrlParser: true })
    .then(() => console.log('[mongoose]: connection successful'))
    .catch(err => console.log(`[mongoose]: ${err}`));

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api', constructRoutes());

app.use('*', (err, req, res, next) => {
    if (err) {
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    } else {
        res.sendStatus(404);
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`🚀 http://localhost:${port}`);
});
