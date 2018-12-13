import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { Exercise, IExercise } from '../models/exercise';
import { ExerciseEvent, IExerciseEvent } from '../models/exercise-event';

export class ExerciseEventRoute {
    public routes(router: Router): void {
        router.get('/exerciseEvent/:id', this.getById);
        router.post('/exerciseEvent', this.create);
        //        router.patch('/exerciseEvent/:eventId', this.update);
        router.delete('/exerciseEvent/:id', this.delete);
    }

    private async getById(req: Request, res: Response) {
        if (!Types.ObjectId.isValid(req.params.id)) {
            res.status(404).send({message: `Exercise with id: ${req.params.id} not found`});
            return;
        }

        try {
            let result: object = await ExerciseEvent.findById(req.params.id).exec();
            if (result) {
                res.send(result);
            } else {
                res.status(404).send({message: `ExerciseEvent with id: ${req.params.id} not found`});
            }
        } catch (err) {
            console.error(err);
            res.status(404).send({ message: `Exercise with id: ${req.params.id} not found`});
        }
    }

    private async create(req: Request, res: Response) {
        let exerciseEvent: IExerciseEvent = null;
        let exercise: IExercise = null;

        try {
            let exerciseId = req.body.exerciseEvent.exerciseId;

            exercise = await Exercise.findById(exerciseId).exec();

        } catch (err) {
            console.log(err);
            res.status(400).send({message: "Invalid exerciseId" });
            return;
        }

        if (!exercise) {
            res.status(400).send({message: "Invalid exerciseId" });
            return;
        }

        try {
            exerciseEvent = new ExerciseEvent({
                exercise: exercise,
                timestamp: req.body.exerciseEvent.timestamp ? req.body.exerciseEvent.timestamp : null,
                userId: req.body.exerciseEvent.userId ? req.body.exerciseEvent.userId : null,
                weight: req.body.exerciseEvent.weight ? req.body.exerciseEvent.weight : null,
                sets: req.body.exerciseEvent.sets ? req.body.exerciseEvent.sets : null,
                reps: req.body.exerciseEvent.reps ? req.body.exerciseEvent.reps : null
            });

        } catch (err) {
            console.error(err);
            res.status(400).send({ message: "Invalid ExerciseEvent "});
            return;
        }

        try {
            let result: IExerciseEvent = await exerciseEvent.save();

            res.send(result);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
    }

    private async delete(req: Request, res: Response): Promise<void> {
        let result: object = null;

        try {
            result = await ExerciseEvent.findById(req.params.id).exec();
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        if (!result) {
            res.status(400).send({ message: `ExerciseEvent with ${req.params.id} not found`});
            return;
        }

        try {
            result = await ExerciseEvent.findOneAndDelete({_id: req.params.id});

            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}
