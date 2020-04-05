import { Schema, model, Document } from "mongoose";
const bcrypt = require('bcrypt-nodejs');

const userSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        max: 50,
    },
    name: {
        type: String,
        required: true,
        max: 50
    },
    username: {
        type: String,
        unique: true,
        required: true,
        max: 50
    }
}, {
    timestamps: true
});


/**
 * Middleware to save a user password as hash
 * @param next 
 */
function generateSaltAndSave(next) {
    let user = this;
    console.log(user);
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, undefined, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
}

/**
 * Compares a given password to saved hash of a user
 * @param candidatePassword 
 */
function comparePassword(candidatePassword: String): Promise<Boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) {
                reject(err);
            }
            resolve(isMatch);
        });
    });
};

userSchema.pre('save', generateSaltAndSave);
userSchema.methods.comparePassword = comparePassword;

export interface IUser extends Document {
    _id: String,
    email: String,
    password: String,
    name: String,
    username: String,
    comparePassword: Function
}

export default model('User', userSchema);