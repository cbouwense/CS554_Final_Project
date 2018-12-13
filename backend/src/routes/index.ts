import * as express from 'express';
import { ExerciseRoute } from './exercise';
import { ExerciseEventRoute } from './exercise-event';

const exerciseRoutes: ExerciseRoute = new ExerciseRoute();
const exerciseEventRoutes: ExerciseEventRoute = new ExerciseEventRoute();

export function constructRoutes(router: express.Router) {
    exerciseRoutes.routes(router);
    exerciseEventRoutes.routes(router);
    router.use('*', (_req, res) => {
        res.status(404).json({ message: "Not Found" });
    });
}

