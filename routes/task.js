import express from 'express';
import { createTask, deleteTask, getAllTasks, getAllTasksForUser, getTask, updateTask } from '../controllers/taskController.js';

const router = express.Router();

//Get All the tasks for user
router.get("/:userId/task", getAllTasksForUser);

//CREATE
router.post("/:userId", createTask);

//UPDATE
router.put("/:taskId", updateTask);

//DELETE
router.delete("/:taskId", deleteTask);

//GET
router.get("/:taskId", getTask);

//GET ALL
router.get("/", getAllTasks);

export default router;