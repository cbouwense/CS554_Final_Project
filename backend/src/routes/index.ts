import { Router } from 'express';
import exercise from './exercise';
import exerciseEvent from './exercise-event';
import user from './user';

export function constructRoutes() {
    const router = Router();
    exercise(router);
    exerciseEvent(router);
    user(router);
    return router;
}
