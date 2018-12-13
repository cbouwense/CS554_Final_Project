import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import { Exercise, IExercise } from '../models/exercise';
import { handleErrors } from '../util';

async function getAll(req: Request, res: Response) {
    res.send(await Exercise.find({}).exec());
}

async function getById(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: `Exercise with id: ${req.params.id} not found` });
        return;
    }

    const result: object = await Exercise.findById(req.params.id).exec();

    if (result) {
        res.send(result);
    } else {
        res.status(404).send({ message: `Exercise with id: ${req.params.id} not found` });
    }
}

async function create(req: Request, res: Response) {
    let exercise: IExercise = null;

    try {
        exercise = new Exercise({
            description: null,
            ...req.body,
        });
    } catch (err) {
        res.status(400).send({ message: 'Invalid exercise' });
        return;
    }

    res.send(await exercise.save());
}

async function deleteExercise(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: `Exercise with id: ${req.params.id} not found` });
        return;
    }

    let result: object = null;

    try {
        result = await Exercise.findById(req.params.id).exec();
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }

    if (!result) {
        res.status(400).send({ message: `Exercise with ${req.params.id} not found` });
        return;
    }

    try {
        result = await Exercise.findOneAndDelete({ _id: req.params.id });

        res.send(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default (router: Router) => {
    router.get('/exercise', handleErrors(getAll));
    router.get('/exercise/:id', handleErrors(getById));
    router.post('/exercise', handleErrors(create));
};
