import { compare, hash } from 'bcryptjs';
import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import { ExerciseEvent } from '../models/exercise-event';
import { IUser, User } from '../models/user';
import { upload } from '../s3';
import { handleErrors } from '../util';

const saltLength = 11;

async function createUser(req: Request, res: Response) {
    const { username, password } = req.body;

    if (username == null || username.length === 0 ||
        password == null || password.length === 0) {
        res.status(400).send({ message: 'missing username or password' });
        return;
    }

    if (await User.findOne({ username }) != null) {
        res.status(400).send({ message: `User ${username} already exists` });
        return;
    }

    let user: IUser = null;

    try {
        user = new User({
            username,
            password: await hash(password, saltLength),
            profile_image: 'http://localhost:4000/defaultprofile.png',
            bio: null,
            images: [],
        });
    } catch (err) {
        res.status(400).send({ message: 'Invalid user' });
        return;
    }

    const saved = await user.save();
    res.send({
        _id: saved._id,
        username: saved.username,
        profile_image: saved.profile_image,
        exerciseEvents: [],
    });
}

async function getAllUsers(req: Request, res: Response): Promise<void> {
    res.send(await User.find());
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

    res.send({
        _id: result._id,
        username: result.username,
        profile_image: result.profile_image,
        bio: result.bio,
        images: result.images,
    });
}

async function loginUser(req: Request, res: Response) {
    const { username, password } = req.body;
    const result = await User.findOne({ username });

    if (!result) {
        res.status(404).send({ message: `User with username: ${username} not found` });
        return;
    }

    try {
        if (!await compare(password, result.password)) {
            res.status(404).send({ message: 'Invalid password' });
            return;
        }

        const exerciseEvents = await ExerciseEvent.find({ userId: result._id });

        res.send({
            _id: result._id,
            username: result.username,
            profile_image: result.profile_image,
            exerciseEvents,
        });
    } catch (err) {
        console.error(err);
        res.status(404).send({ message: err.message });
        return;
    }
}

async function updateUser(req: Request, res: Response) {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        res.status(404).send({ message: `User with id: ${id} not found` });
        return;
    }

    const user = await User.findById(id);

    if (!user) {
        res.status(404).send({ message: `User with id ${id} not found` });
    }

    if ((req.files as any).gym_image_upload) {
        user.images.unshift((req.files as any).gym_image_upload[0].location);
    }

    const toUpdate = {
        username: req.body.username || user.username,
        password: req.body.password || user.password,
        profile_image: (req.files as any).profile_image_upload[0].location ||
                       user.profile_image,
        bio: req.body.bio || user.bio,
        images: user.images,
    };

    if (req.body.images) {
        req.body.images.forEach(async(elem) => {
            if (toUpdate.images.indexOf(elem) === -1) {
                toUpdate.images.push(elem);
            }
        });
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

const imageUploads = upload.single('profile_image');

export default (router: Router) => {
    router.get('/user', handleErrors(getAllUsers));
    router.get('/user/:id', handleErrors(getById));
    router.post('/user/login', handleErrors(loginUser));
    router.post('/user', handleErrors(createUser));
    router.patch('/user/:id',
                 upload.fields([{ name: 'profile_image_upload' }, { name: 'gym_image_upload' }]),
                 handleErrors(updateUser));
    router.delete('/user/:id', handleErrors(deleteUser));
};
