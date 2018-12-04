const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const ExerciseSchema = new Schema({
	_id: { type: ObjectId, required: true },
	name: { type: String, required: true },
	description: String,
	images: [mongoose.SchemaTypes.Url],
	bodyparts_worked: Array,
	equipment: Array,
	type: String
});