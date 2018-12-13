import { Router, Request, Response } from 'express';
import { ExerciseEvent, IExerciseEvent } from '../models/exercise-event';
import { Types } from 'mongoose';
import { User, IUser} from '../models/user';
import { handleErrors } from '../util';

async function createUser(req: Request, res: Response) {
    let user: IUser = null;

    try {
        user = new User({
            ...req.body
        });
    } catch (err) {
        res.status(400).send({ message: 'Invalid user' });
        return;
    }

    res.send(await user.save());
}

async function getAllUsers(req: Request, res: Response): Promise<void> {
    res.send(await User.find({}));
}

async function getById(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: `User with id: ${req.params.id} not found` });
        return;
    }

    const result = await User.findById(req.params.id);

    if (!result) {
        res.status(404).send({ message: `User with id: ${req.params.id} not found` });
        return;
    }

    result.exerciseEvents.map(async(elem) => {
        return await ExerciseEvent.findById(elem);
    });

    res.send({
        _id: result._id,
        username: result.username,
        profile_image: result.profile_image,
        bio: result.bio,
        images: result.images,
        exerciseEvents: result.exerciseEvents,
    });
}

async function loginUser(req: Request, res: Response) {
    let username = null;
    let result = null;

    username = req.body.username;


    result = await User.findOne({ username: username });

    if (!result) {
        res.status(404).send({ message: `User with username: ${username} not found` });
        return;
    }

    try {
        const password = req.body.password;

        if (password !== result.password) {
            res.status(404).send({ message: `Invalid password` });
            return;
        }

        res.send({
            _id: result._id,
            username: result.username,
        });
    } catch (err) {
        console.error(err);
        res.status(404).send({ message: `Invalid password` });
        return;
    }
}

async function updateUser(req: Request, res: Response) {
    let id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: `User with id: ${id} not found` });
        return;
    }

    let user = await User.findById(id);

    if (!user) {
        res.status(404).send({ message: `User with id ${id} not found` });
    }

    let err = false;
    let toUpdate = { 
        username: req.body.username || user.username,
        password: req.body.password || user.password,
        profile_image: req.body.profile_image || user.profile_image,
        bio: req.body.bio || user.bio,
        images: user.images,
        exerciseEvents: user.exerciseEvents,

    };

    if (req.body.images) {
        req.body.images.forEach(async(elem) => {
            if (toUpdate.images.indexOf(elem) === -1) {
                toUpdate.images.push(elem);
            }
        });
    }

    if (req.body.exerciseEvents) {
        for (let x in req.body.exerciseEvents) {
            let eventId = req.body.exerciseEvents[x];
            if (!Types.ObjectId.isValid(eventId)) {
                res.status(404).send({ message: `ExerciseEvent with id: ${eventId} not found` });
                return;
            }
            let result = await ExerciseEvent.findById(eventId); 

            if (!result) {
                err = true;
                res.status(404).send({ 
                    message: `ExerciseEvent with id ${eventId} not found`
                });
                return;
            }

            if (toUpdate.exerciseEvents.indexOf(eventId) === -1) {
                toUpdate.exerciseEvents.push(eventId);
            }
        }
    }

    console.log(toUpdate);


    res.send(await User.findOneAndUpdate({ _id: id }, toUpdate, { new: true }));

}

async function deleteUser(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.id)) {
        res.status(404).send({ message: `User with id: ${req.params.id} not found` });
        return;
    }

    const result = await User.findById(req.params.id);

    if (!result) {
        res.status(400).send({ message: `User with ${req.params.id} not found` });
        return;
    }

    res.send(await User.findByIdAndDelete(req.params.id));

}

export default (router: Router) => {
    router.get('/user', handleErrors(getAllUsers));
    router.get('/user/:id', handleErrors(getById));
    router.post('/user/login', handleErrors(loginUser));
    router.post('/user', handleErrors(createUser));
    router.patch('/user/:id', handleErrors(updateUser));
    router.delete('/user/:id', handleErrors(deleteUser));
};
