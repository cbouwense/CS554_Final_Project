import {Document, model, Schema, Model} from 'mongoose';

export interface IExercise extends Document {
	name: string;
	description: string;
	images: string[];
	bodyparts_worked: string[];
	equipment: string[];
}

const ExerciseSchema: Schema = new Schema({
	name: { 
		type: String, 
		required: true 
	},
	description: String,
	images: [String],
	bodyparts_worked: [String],
	equipment: [String]
});

const Exercise: Model<IExercise> = model<IExercise>('Exercise', ExerciseSchema);
export {Exercise, ExerciseSchema};
