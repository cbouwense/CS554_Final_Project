import { model, Schema } from 'mongoose';
let user_salt = 10; // User salt
const user_schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_image: String,
    bio: String,
    images: [String]
});

var User = model('User', user_schema);
module.exports = User;

