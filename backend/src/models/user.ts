import {Document, model, Model, Schema} from 'mongoose';
import {genSalt, hash} from 'bcrypt';

let user_salt = 10; // User salt

export interface IUser extends Document {
    username: string;
    password: string;
    profile_image: string;
    bio: string;
    images: string[];
}

const user_schema: Schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_image: String,  // URL to image store
    bio: String,
    images: [String]
});

user_schema.pre<IUser>('save', (next) => {
    if (this.isModified('password') || this.isNew) {
        genSalt(user_salt, (err, salt) => {
            if (err) return next(err);
            hash(this.password, salt, null, (err, hash) => {
                if (err) return next(err);
                this.password = hash;
                next();
            });
        });
    }
    else return next();
});

var UserModel: Model<IUser> = model<IUser>('User', user_schema);

export default UserModel;