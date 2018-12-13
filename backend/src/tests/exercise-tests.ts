import * as mongoose from 'mongoose';
import { Exercise, IExercise } from '../models/exercise';

mongoose.connect('mongodb://localhost/mothballs')
    .then(() => console.log('[mongoose]: connection successful'))
    .catch(err => console.log(`[mongoose]: ${err}`));

/**
 * First test: valid user
 */
const goodBoi: IExercise = new Exercise({
    name: 'bench press',
    description: 'the objectively best exercise',
    images: [
        'https://www.rubhub.tv/',
        'https://poop.bike/',
    ],
    bodyparts_worked: [
        'chest',
        'triceps',
    ],
    equipment: [
        'bench',
        'bar',
        'plates',
    ],
});

goodBoi.save((error) => {
    if (error) console.log(`failed creating user: ${error}`);
    else console.log('successfully created the user');
});

/*
User.find({}, function(err, docs) {
	console.log(docs);
});

good_boi.set({ username: 'bepis' });
good_boi.save();

User.find({}, function(err, docs) {
	console.log(docs);
});
*/
