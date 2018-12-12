import {Document, model, Model, Schema} from 'mongoose';
import {ExerciseEvent, IExerciseEvent} from './exercise-events';

export interface IUser extends Document {
    username: string;
    password: string;
    profile_image: string;
    bio: string;
    images: string[];
    exerciseEvents: IExerciseEvent[]
}

const user_schema: Schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_image: String,  // URL to image store
    bio: String,
    images: [String],
    exerciseEvents: [ExerciseEvent]
});

const User: Model<IUser> = model<IUser>('User', user_schema);
export {User};