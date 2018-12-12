import { Router, Request, Response } from 'express';
import { ExerciseEvent } from '../models/exercise-event';
import { IExerciseEvent } from '../models/exercise-event';

export class ExerciseEventRoute {
    public routes(router: Router): void {
        router.get('/exerciseEvent/:eventId', this.getById);
        router.post('/exerciseEvent', this.create);
        router.delete('/exerciseEvent/:eventId', this.delete);
    }

    private async getById(req: Request, res: Response) {
        try {
            let result: object = await ExerciseEvent.findById(req.params.id).exec();
            res.send({exercises: result});
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    private async create(req: Request, res: Response) {
        let exerciseEvent: IExerciseEvent = null;

        try {
            exerciseEvent = new ExerciseEvent({
                exerciseId: req.body.exerciseEvent.exerciseId ? req.body.exerciseEvent.exerciseId : null,
                timestamp: req.body.exerciseEvent.timestamp ? req.body.exerciseEvent.timestamp : null,
                userId: req.body.exerciseEvent.userId ? req.body.exerciseEvent.userId : null,
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
