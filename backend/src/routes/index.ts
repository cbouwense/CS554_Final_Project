import { Router } from 'express';
import exercise from './exercise';
import exerciseEvent from './exercise-event';

export function constructRoutes() {
    const router = Router();
    exercise(router);
    exerciseEvent(router);
    return router;
}
