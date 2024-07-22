import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    let { id } = req.params; //user id
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        ); //it returns the previous op json data, so we need to send new : true
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    let { id } = req.params; //user id
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json("User has been Deleted");
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    let { emailId } = req.params;
    let user = await User.findOne({ email: emailId });
    if (!user) return res.status(200).json({
        "success": false,
        "message": "User not found!"
    });

    try {
        user = await User.findById(user._id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        console.log("Users found: ", users);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
} 