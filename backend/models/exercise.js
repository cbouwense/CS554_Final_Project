import {Schema, Model} from 'mongoose';

const ExerciseSchema = new Schema({
	name: { 
		type: String, 
		required: true 
	},
	description: String,
	images: [String],
	bodyparts_worked: [String],
	equipment: [String]
});

module.exports = Model('Exercise', ExerciseSchema);