import {Document, model, Schema, Model} from 'mongoose';

export interface IExerciseEvent extends Document {
	exericseId: string;
	timestamp: Date;
	userId: string;
	weight: number;
	sets: number;
	reps: number;
}

const exerciseEventSchema: Schema = new Schema({
	exerciseId: { 
		type: String, 
		required: true 
	},
	timestamp: Date,
	userId: String,
	weight: Number,
	sets: Number,
	reps: Number
});

const ExerciseEvent: Model<IExerciseEvent> = model<IExerciseEvent>('ExerciseEvent', exerciseEventSchema);
export {ExerciseEvent};