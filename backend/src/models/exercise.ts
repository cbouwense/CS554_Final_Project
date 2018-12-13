import { Document, model, Schema } from 'mongoose';

export interface IExercise extends Document {
    name: string;
    description: string;
    images: string[];
    bodyparts_worked: string[];
    equipment: string[];
}

// tslint:disable-next-line: variable-name
export const ExerciseSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    images: [String],
    bodyparts_worked: [String],
    equipment: [String],
});

// tslint:disable-next-line: variable-name
export const Exercise = model<IExercise>('Exercise', ExerciseSchema);
