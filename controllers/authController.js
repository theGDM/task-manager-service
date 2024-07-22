import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utills/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    // if (user) return next(createError(404, "User already exists with the same email!"));
    if (user) return res.status(200).json({
        "success": false,
        "message": "User already exists with the same email!"
    });

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hash,
        })

        await newUser.save();
        res.status(200).json({
            "success": true,
            "message": "User registered successfully!"
        });
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }) //as we have only one user with this username
        console.log(user);
        // if (!user) return next(createError(404, "User not found!"));
        if (!user) return res.status(200).json({
            "success": false,
            "message": "User not found!"
        });

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        // if (!isPasswordCorrect) return next(createError(400, "Wrong password or username"));
        if (!isPasswordCorrect) return res.status(200).json({
            "success": false,
            "message": "Wrong password or username"
        });

        //We will create the token here
        const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
        //now what we will do, we will set this token into cookies
        const { password, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true, //it does not allow to any client script to reach this cookie
            }).
            status(200).
            json(otherDetails);
    } catch (err) {
        next(err);
    }
}