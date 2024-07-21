import Jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    //if we have the token we need to check, whether it is right token or not
    Jwt.verify(token, process.env.JWTSECRET, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid!"));
        }
        console.log(user);
        req.user = user; //user is our information
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    })
}