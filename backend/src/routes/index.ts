import * as express from 'express';
import exerciseRoute from './exercise';
import exerciseEventRoute from './exercise-event';


export function constructRoutes(router: express.Router) {
    exerciseRoute(router);
    exerciseEventRoute(router);
    router.use('*', (_req, res) => {
        res.status(404).json({ message: "Not Found" });
    });
}

