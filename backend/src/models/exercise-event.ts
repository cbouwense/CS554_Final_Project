import {Document, model, Schema, Model} from 'mongoose';
import { IExercise, ExerciseSchema }  from './exercise';

export interface IExerciseEvent extends Document {
	exercise: IExercise;
	timestamp: Date;
	userId: string;
	weight: number;
	sets: number;
	reps: number;
}

const ExerciseEventSchema: Schema = new Schema({
	exercise: { 
		type: ExerciseSchema, 
		required: true 
	},
	timestamp: Date,
	userId: String,
	weight: Number,
	sets: Number,
	reps: Number
});

const ExerciseEvent: Model<IExerciseEvent> = model<IExerciseEvent>('ExerciseEvent', ExerciseEventSchema);
export {ExerciseEvent, ExerciseEventSchema};
