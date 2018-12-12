"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var exercise_schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    images: [String],
    bodyparts_worked: [String],
    equipment: [String]
});
var ExerciseModel = mongoose_1.model('Exercise', exercise_schema);
module.exports = ExerciseModel;
