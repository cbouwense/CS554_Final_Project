import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import { Exercise, IExercise } from '../models/exercise';
import { ExerciseEvent, IExerciseEvent } from '../models/exercise-event';
import { handleErrors } from '../util';

async function create(req: Request, res: Response) {
    const { exerciseId } = req.body;

    if (exerciseId == null) {
        res.status(400).send({ message: 'Missing exercise ID' });
        return;
    }

    if (!Types.ObjectId.isValid(exerciseId)) {
        res.status(400).send({ message: `Exercise with id: ${exerciseId} not found` });
        return;
    }

    const exercise = await Exercise.findById(exerciseId).exec();
    if (!exercise) {
        res.status(404).send({ message: `Exercise with id: ${exerciseId} not found` });
        return;
    }

    const exerciseEvent = new ExerciseEvent({
        exercise,
        userId: req.body.userId || null,
        timestamp: req.body.timestamp && !isNaN(new Date(req.body.timestamp).getTime())
            ? new Date(req.body.timestamp) : null,
        weight: req.body.weight || null,
        sets: req.body.sets || null,
        reps: req.body.reps || null,
    });

    res.send(await exerciseEvent.save());
}

async function getById(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: `ExerciseEvent with id: ${req.params.id} not found` });
        return;
    }

    const result = await ExerciseEvent.findById(req.params.id).exec();

    if (result) {
        res.send(result);
    } else {
        res.status(404).send({
            message: `ExerciseEvent with id: ${req.params.id} not found`,
        });
    }
}

async function update(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: `ExerciseEvent with id: ${req.params.id} not found` });
        return;
    }

    let exercise;
    console.log(req.body);

    if (req.body.exerciseId) {
        if (!Types.ObjectId.isValid(req.body.exerciseId)) {
            res.status(404).send({
                message: `Exercise with id: ${req.body.exerciseId} not found`,
            });
            return;
        }

        exercise = await Exercise.findById(req.body.exerciseId);

        if (!exercise) {
            res.status(404).send({
                message: `Exercise with id: ${req.body.exerciseId} not found`,
            });
            return;
        }
    }

    let result = await ExerciseEvent.findById(req.params.id);

    if (!result) {
        res.status(404).send({ message: `ExerciseEvent with id: ${req.params.id} not found` });
        return;
    }

    const toUpdate = {
        exercise: exercise || result.exercise,
        timestamp: req.body.timestamp && !isNaN(new Date(req.body.timestamp).getTime())
            ? new Date(req.body.timestamp) : result.timestamp,
        userId: req.body.userId || result.userId,
        weight: req.body.weight || result.weight,
        sets: req.body.sets || result.sets,
        reps: req.body.reps || result.reps,
    };
    console.log(toUpdate);
    result = await ExerciseEvent
        .findOneAndUpdate({ _id: req.params.id }, toUpdate, { new: true });

    res.send(result);
}

async function deleteExerciseEvent(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: `Exercise with id: ${req.params.id} not found` });
        return;
    }

    const result = await ExerciseEvent.findById(req.params.id);

    if (!result) {
        res.status(400).send({ message: `ExerciseEvent with ${req.params.id} not found` });
        return;
    }

    res.send(await ExerciseEvent.findByIdAndDelete(req.params.id));
}

export default (router: Router) => {
    router.get('/exerciseEvent/:id', handleErrors(getById));
    router.post('/exerciseEvent', handleErrors(create));
    router.patch('/exerciseEvent/:id', handleErrors(update));
    router.delete('/exerciseEvent/:id', handleErrors(deleteExerciseEvent));
};
