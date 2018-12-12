import { model, Schema } from 'mongoose';
const exercise_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    images: [String],
    bodyparts_worked: [String],
    equipment: [String]
});
const ExerciseModel = model('Exercise', exercise_schema);
module.exports = ExerciseModel;
