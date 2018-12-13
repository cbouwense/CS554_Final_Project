import { Document, model, Schema } from 'mongoose';
import { ExerciseSchema, IExercise } from './exercise';

export interface IExerciseEvent extends Document {
    exercise: IExercise;
    timestamp: Date;
    userId: string;
    weight: number;
    sets: number;
    reps: number;
}

// tslint:disable-next-line: variable-name
export const ExerciseEventSchema: Schema = new Schema({
    exercise: {
        type: ExerciseSchema,
        required: true,
    },
    timestamp: Date,
    userId: String,
    weight: Number,
    sets: Number,
    reps: Number,
});

// tslint:disable-next-line: variable-name
export const ExerciseEvent = model<IExerciseEvent>('ExerciseEvent', ExerciseEventSchema);
