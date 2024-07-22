import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';
import { verifyUser } from '../utills/verifyToken.js';

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser); //so the owner or admin can update the user

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:emailId", getUser);

//GET ALL
router.get("/", getAllUsers); //only admin can get all the data, not every user

export default router;