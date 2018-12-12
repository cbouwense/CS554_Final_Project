import * as express from 'express';
import { ExerciseRoute } from './exercise';

const exerciseRoutes: ExerciseRoute = new ExerciseRoute();

export function constructRoutes(router: express.Router) {
    exerciseRoutes.routes(router);
    router.use('*', (_req, res) => {
        res.status(404).json({ message: "Not Found" });
    });
}

