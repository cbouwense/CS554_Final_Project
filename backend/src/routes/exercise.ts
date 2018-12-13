import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { Exercise, IExercise } from '../models/exercise';

async function getAll(req: Request, res: Response) {
    try {
        let result: object = await Exercise.find({}).exec();
        res.send({exercises: result});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getById(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({message: `Exercise with id: ${req.params.id} not found`});
        return;
    }

    try {
        let result: object = await Exercise.findById(req.params.id).exec();

        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: `Exercise with id: ${req.params.id} not found`});
        }

    } catch (err) {
        console.error(err);
        res.status(404).send({ message: `Exercise with id: ${req.params.id} not found`});
    }
}

async function create(req: Request, res: Response) {
    let exercise: IExercise = null;

    try {
        exercise = new Exercise({
            name: req.body.exercise.name,
            description: req.body.exercise.description? req.body.exercise.description: null,
            images: req.body.exercise.images? req.body.exercise.images: null,
            bodyparts_worked: req.body.exercise.bodyparts_worked? req.body.exercise.bodyparts_worked: null,
            equipment: req.body.exercise.equipment? req.body.exercise.equipment: null
        });
    } catch (err) {
        res.status(400).send({ message: "Invalid exercise" });
        return;
    }

    try {
        let result: IExercise = await exercise.save();

        res.send(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
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
    router.get('/exercise', getAll);
    router.get('/exercise/:id', getById);
    router.post('/exercise', create);
};
