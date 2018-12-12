import {Document, model, Schema, Model} from 'mongoose';

export interface IExercise extends Document {
	name: string;
	description: string;
	images: string[];
	bodyparts_worked: string[];
	equipment: string[];
}

const exercise_schema: Schema = new Schema({
	name: { 
		type: String, 
		required: true 
	},
	description: String,
	images: [String],
	bodyparts_worked: [String],
	equipment: [String]
});

const ExerciseModel: Model<IExercise> = model<IExercise>('Exercise', exercise_schema);

module.exports = ExerciseModel;