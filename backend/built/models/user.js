import { model, Schema } from 'mongoose';
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
var UserModel = model('User', user_schema);
export default UserModel;
