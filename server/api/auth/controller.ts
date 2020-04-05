import { Request, Response } from "express";
import User, { IUser } from '../../models/user.model';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
const jwt_secret = process.env.JWT_SECRET;


/* Validations for registrations */
export const _register_checks = [
    check('email').isEmail().exists(),
    check('password').isLength({ min: 6 }).exists(),
    check('name').isLength({ min: 4 }).exists(),
    check('username').isLength({ min: 3 }).exists()
];
export async function register(req: Request, res: Response) {

    //check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const userData = req.body;
    const user = new User({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        username: userData.username
    });

    user.save().then((doc: IUser) => {
        return res.status(200).json({
            message: `Success! Successfully registered`,
            id: doc._id
        });
    }).catch(err => {
        return res.status(409).json({
            message: `Registration failed`,
            error: err
        });
    });
}


//============================================================================================

/* Validating login checks */
export const _logIn_checks = [
    check('email').isEmail().exists(),
    check('password').isLength({ min: 6 }).exists()
];
export async function logIn(req: Request, res: Response) {
    //check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    User.findOne({ email: req.body.email }).then((user: IUser) => {
        // if the document is empty
        if (!user) throw new Error('No accounts found');

        // compare the password
        user.comparePassword(req.body.password).then(isMatch => {
            if (!isMatch) {
                throw new Error("No users found");
            }
            // sign a json web token
            let token = jwt.sign({
                id: user._id,
                email: user.email,
                auth_date: Date.now(),
            }, jwt_secret, {
                expiresIn: 604800 // valid till a week
            });

            return res.status(200).json({
                message: 'Successfully Signed In',
                token
            });
        }).catch(err => { // wrong password
            return res.status(403).json({
                message: 'Invalid Username or password'
            });
        });
    }).catch(err => { // no account found for the given details
        return res.status(402).json({
            message: 'No account found for the email',
            error: err.message
        });
    });
}

//============================================================================================

export const _username_checks = [
    check('username').isLength({ min: 3 }).exists()
];
/**
 * Checks if a username exists in the DB
 * @param {Request} req 
 * @param {Response} res 
 */
export async function checkIfUsernameExists(req: Request, res: Response) {
    //check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    User.findOne({ username: req.body.username }).then((user: IUser) => {
        if (!user) throw new Error("Username doesn't exist");

        return res.status(200).json({
            message: "Username Exists"
        });

    }).catch(error => {
        return res.status(402).json({
            message: error.message,
        })
    })
}