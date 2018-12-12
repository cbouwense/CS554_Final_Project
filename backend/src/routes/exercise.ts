import * as express from 'express';
/*import {ExerciseModel} from '../models/exercise';*/
import { IExercise } from '../models/exercise';
const ExerciseModel = require('../models/exercise');

export class Exercise {
    public routes(router: express.Router): void {
        router.get('/exercise', this.getAll);
        router.get('/exercise/:id', this.getById);
        router.post('/exercise', this.createExercise);
    }

    private async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            let result: object = await ExerciseModel.find({}).exec();
            res.send({exercises: result});
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    private async getById(req: express.Request, res: express.Response): Promise<void> {
        let id: String = req.params.id;

        try {
            let result: object = await ExerciseModel.findById(id);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    private async createExercise(req: express.Request, res: express.Response): Promise<void> {
        let exercise: IExercise = null;
        try {
            exercise = new ExerciseModel({
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
