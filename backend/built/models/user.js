"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt_1 = require("bcrypt");
var user_salt = 10; // User salt
var user_schema = new mongoose_1.Schema({
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
user_schema.pre('save', function (next) {
    if (_this.isModified('password') || _this.isNew) {
        bcrypt_1.genSalt(user_salt, function (err, salt) {
            if (err)
                return next(err);
            bcrypt_1.hash(_this.password, salt, null, function (err, hash) {
                if (err)
                    return next(err);
                _this.password = hash;
                next();
            });
        });
    }
    else
        return next();
});
var UserModel = mongoose_1.model('User', user_schema);
exports.default = UserModel;
