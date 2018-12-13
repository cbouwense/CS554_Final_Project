import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { User, IUser} from '../models/user';
import { ExerciseEvent, IExerciseEvent } from '../models/exercise-event';

async function createUser(req: Request, res: Response) {
    let user: IUser = null;

    try {
        user = new User({
            username: req.body.user.username,
            password: req.body.user.password? req.body.user.password: null,
            profile_image: req.body.user.profile_image? req.body.user.profile_image: null,
            bio: req.body.user.bio? req.body.user.bio: null,
            images: req.body.user.images? req.body.user.images: null,
            exerciseEvents: req.body.user.exerciseEvents? req.body.user.exerciseEvents: null
        });
    } catch (err) {
        res.status(400).send({ message: "Invalid user" });
        return;
    }

    try {
        let result: IUser = await user.save();

        res.send(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}
async function getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        let result: object = await User.find({}).exec();
        res.send({users: result});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getById(req: Request, res: Response) {
    if (!Types.ObjectId.isValid(req.params.userId)) {
        res.status(404).send({ message: `User with id: ${req.params.id} not found` });
        return;
    }

    try {
        const result = await User.findById(req.params.id).exec();
        if (!result) {
            res.status(404).send({ message: `User with id: ${req.params.id} not found` });
            return;
        }

        res.send({
            _id: result._id,
            username: result.username,
            profile_image: result.profile_image,
            bio: result.bio,
            images: result.images,
            exerciseEvents: result.exerciseEvents,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function loginUser(req: Request, res: Response) {
    let username = null;
    let result = null;

    try {
        username = req.body.user.username;

    } catch (err) {
        console.error(err);
        res.status(404).send({ message: `User with username: ${username} not found` });
        return;
    }

    try {
        result = await User.findOne({ username: username }).exec(); 
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }

    if (!result) {
        res.status(404).send({ message: `User with username: ${username} not found` });
        return;
    }

    try {
        let password = req.body.user.password;

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
    if (!Types.ObjectId.isValid(req.params.userId)) {
        res.status(404).send({ message: `User with id: ${req.params.id} not found` });
        return;
    }

    let id = req.params.id;
    try {
        let toUpdate = req.body.user;
    } catch (err) {
        console.error(err);
    }


}

export default (router: Router) => {
    router.get('/user', getAllUsers);
    router.get('/user/id/:id', getById);
    router.post('/user/login', loginUser);
    router.post('/user', createUser);
    router.post('/user/:id', updateUser);
};
