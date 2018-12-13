import { Document, model, Model, Schema } from 'mongoose';
import { ExerciseEvent, IExerciseEvent } from './exercise-event';

export interface IUser extends Document {
    username: string;
    password: string;
    profile_image: string;
    bio: string;
    images: string[];
    exerciseEvents: IExerciseEvent[];
}

const userSchema: Schema = new Schema({
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
    exerciseEvents: [ExerciseEvent],
});

// tslint:disable-next-line:variable-name
const User = model<IUser>('User', userSchema);
export { User };
