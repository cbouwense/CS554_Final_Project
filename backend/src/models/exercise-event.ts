import { Document, model, Model, Schema } from 'mongoose';

export interface IExerciseEvent extends Document {
    exerciseId: string;
    timestamp: Date;
    userId: string;
    weight: number;
    sets: number;
    reps: number;
}

// tslint:disable-next-line:variable-name
export const ExerciseEventSchema = new Schema({
    exerciseId: {
        type: String,
        required: true,
    },
    timestamp: Date,
    userId: String,
    weight: Number,
    sets: Number,
    reps: Number,
});

// tslint:disable-next-line:variable-name
export const ExerciseEvent = model<IExerciseEvent>('ExerciseEvent', ExerciseEventSchema);
