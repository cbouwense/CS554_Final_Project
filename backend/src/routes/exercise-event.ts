import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import { Exercise, IExercise } from '../models/exercise';
import { ExerciseEvent, IExerciseEvent } from '../models/exercise-event';

async function create(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.body.exerciseEvent.exerciseId)) {
        res.status(404).send({ message: `Exercise with id: ${req.params.id} not found` });
        return;
    }

    let exerciseEvent: IExerciseEvent = null;
    let exercise: IExercise = null;

    try {
        const exerciseId = req.body.exerciseEvent.exerciseId;

        exercise = await Exercise.findById(exerciseId).exec();

    } catch (err) {
        console.log(err);
        res.status(404).send({ message: 'Invalid exerciseId' });
        return;
    }

    if (!exercise) {
        res.status(404).send({ message: 'Invalid exerciseId' });
        return;
    }

    try {
        exerciseEvent = new ExerciseEvent({
            exercise,
            timestamp: req.body.exerciseEvent.timestamp ? req.body.exerciseEvent : null,
            userId: req.body.exerciseEvent.userId ? req.body.exerciseEvent.userId : null,
            weight: req.body.exerciseEvent.weight ? req.body.exerciseEvent.weight : null,
            sets: req.body.exerciseEvent.sets ? req.body.exerciseEvent.sets : null,
            reps: req.body.exerciseEvent.reps ? req.body.exerciseEvent.reps : null,
        });

    } catch (err) {
        console.error(err);
        res.status(400).send({ message: 'Invalid ExerciseEvent' });
        return;
    }

    try {
        const result: IExerciseEvent = await exerciseEvent.save();

        res.send(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}

async function getById(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: `ExerciseEvent with id: ${req.params.id} not found` });
        return;
    }

    try {
        const result: object = await ExerciseEvent.findById(req.params.id).exec();

        if (result) {
            res.send(result);
        } else {
            res.status(404).send({
                message: `ExerciseEvent with id: ${req.params.id} not found`,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(404).send({ message: `Exercise with id: ${req.params.id} not found` });
    }
}

    /*async function update(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: `ExerciseEvent with id: ${req.params.id} not found` });
        return;
    }

    let result = null;

    try {
        result = await ExerciseEvent.findById(req.params.id);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }

    if (!result) {
        res.status(404).send({ message: `ExerciseEvent with id: ${req.params.id} not found` });
        return;
    } 

    try {
        let result = await ExerciseEvent.findByIdAndUpdate(req.params.id, req.body.exerciseEvent).exec();

        res.send(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}*/

async function deleteExerciseEvent(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: `Exercise with id: ${req.params.id} not found` });
        return;
    }

    let result: object = null;

    try {
        result = await ExerciseEvent.findById(req.params.id).exec();
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }

    if (!result) {
        res.status(400).send({ message: `ExerciseEvent with ${req.params.id} not found` });
        return;
    }

    try {
        result = await ExerciseEvent.findByIdAndDelete(req.params.id).exec();

        res.send(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}


export default (router: Router) => {
    router.get('/exerciseEvent/:id', getById);
    router.post('/exerciseEvent', create);
    //    router.patch('/exerciseEvent/:eventId', update);
    router.delete('/exerciseEvent/:id', deleteExerciseEvent);
};
