import * as express from 'express';
import { Exercise, IExercise } from '../models/exercise';

export class ExerciseRoute {
    public routes(router: express.Router): void {
        router.get('/exercise', this.getAll);
        router.get('/exercise/:id', this.getById);
        router.post('/exercise', this.createExercise);
    }

    private async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const result: object = await Exercise.find({}).exec();
            res.send({ exercises: result });
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    private async getById(req: express.Request, res: express.Response): Promise<void> {
        const id: string = req.params.id;

        try {
            const result: object = await Exercise.findById(id);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    private async createExercise(req: express.Request, res: express.Response): Promise<void> {
        let exercise: IExercise = null;
        try {
            exercise = new Exercise({
                name: req.body.exercise.name,
                description: req.body.exercise.description ? req.body.exercise.description : null,
                images: req.body.exercise.images ? req.body.exercise.images : null,
                bodyparts_worked: req.body.exercise.bodyparts_worked || null,
                equipment: req.body.exercise.equipment ? req.body.exercise.equipment : null,
            });
        } catch (err) {
            res.status(400).send({ message: 'Invalid exercise' });
            return;
        }

        try {
            const result: IExercise = await exercise.save();

            res.send(result);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
    }
}
