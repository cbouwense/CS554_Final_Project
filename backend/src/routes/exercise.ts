import { Router, Request, Response } from 'express';
import { Exercise } from '../models/exercise';
import { IExercise } from '../models/exercise';

export class ExerciseRoute {
    public routes(router: Router): void {
        router.get('/exercise', this.getAll);
        router.get('/exercise/:id', this.getById);
        router.post('/exercise', this.create);
    }

    private async getAll(req: Request, res: Response): Promise<void> {
        try {
            let result: object = await Exercise.find({}).exec();
            res.send({exercises: result});
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    private async getById(req: Request, res: Response): Promise<void> {
        let id: String = req.params.id;

        try {
            let result: object = await Exercise.findById(id);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    private async create(req: Request, res: Response): Promise<void> {
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
}
