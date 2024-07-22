import User from "../models/User.js";
import Task from "../models/Task.js";

export const getAllTasksForUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const tasks = await Task.find({ userId: userId });
        res.status(200).json(tasks);
    } catch (err) {
        // Handle errors by passing them to the error handling middleware
        next(err);
    }
}

export const createTask = async (req, res, next) => {
    const userId = req.params.userId;
    const { title, description, taskDeadline } = req.body;

    const newTask = await Task({
        userId: userId,
        title: title,
        description: description,
        column: 0,
        taskDeadline: taskDeadline,
    });

    try {
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (err) {
        next(err);
    }
}

export const updateTask = async (req, res, next) => {
    let { taskId } = req.params; //task id
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: req.body },
            { new: true }
        ); //it returns the previous booking json data, so we need to send new : true
        res.status(200).json(updatedTask);
    } catch (err) {
        next(err);
    }
}

export const deleteTask = async (req, res, next) => {
    const { taskId } = req.params;
    try {
        await Task.findByIdAndDelete(taskId);
        res.status(200).json("Task has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getTask = async (req, res, next) => {
    let { taskId } = req.params; //task id
    try {
        const booking = await Task.findById(taskId);
        res.status(200).json(booking);
    } catch (err) {
        next(err);
    }
}

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
}

