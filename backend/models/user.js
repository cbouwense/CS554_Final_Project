import {Schema, Model} from 'mongoose';
import {genSalt, hash} from 'bcrypt';

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
    profile_image: {
        // URL to image store
        type: String
    },
    bio: {
        type: String
    },
    images: {
        type: [String]
    }
});

user_schema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        genSalt(user_salt, (err, salt) => {
            if (err) return next(err);
            hash(this.password, salt, null, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else return next();
});

module.exports = Model('User', user_schema);