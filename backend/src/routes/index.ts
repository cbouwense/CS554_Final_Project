import * as express from 'express';
import { Exercise } from './exercise';

const exerciseRoutes: Exercise = new Exercise();

export function constructRoutes(router: express.Router) {
    exerciseRoutes.routes(router);
    router.use('*', (_req, res) => {
        res.status(404).json({ message: "Not Found" });
    });
}

