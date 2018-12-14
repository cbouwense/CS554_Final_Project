import { Document, model, Schema } from 'mongoose';
import { ExerciseEventSchema, IExerciseEvent } from './exercise-event';

export interface IUser extends Document {
    username: string;
    password: string;
    profile_image: string;
    bio: string;
    images: string[];
    exerciseEvents: string[];
}

// tslint:disable-next-line: variable-name
export const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_image: String,  // URL to image store
    bio: String,
    images: [String],
    exerciseEvents: [String],
});

// tslint:disable-next-line: variable-name
export const User = model<IUser>('User', UserSchema);
