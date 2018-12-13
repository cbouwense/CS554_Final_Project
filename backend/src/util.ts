import { Request, Response } from 'express';

export function handleErrors(fn: (req: Request, res: Response) => Promise<void>) {
    return (req, res, next) => {
        fn(req, res).catch(next)
    };
}
