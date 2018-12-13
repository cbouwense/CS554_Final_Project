import * as express from 'express';
import exercise from './exercise';
import exerciseEvent from './exercise-event';

export function constructRoutes(router: express.Router) {
    exercise(router);
    exerciseEvent(router);
    router.use('*', (req, res) => {
        res.status(404).json({ message: 'Not Found' });
    });
}
