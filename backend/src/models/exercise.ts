import { Document, model, Model, Schema } from 'mongoose';

export interface IExercise extends Document {
    name: string;
    description: string;
    images: string[];
    bodyparts_worked: string[];
    equipment: string[];
}

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    images: [String],
    bodyparts_worked: [String],
    equipment: [String],
});

// tslint:disable-next-line:variable-name
const Exercise = model<IExercise>('Exercise', exerciseSchema);
export { Exercise };
