import Router from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controller/userController.js";
const userRoutes = Router();

//Show details of all users
userRoutes.get("/", getAllUsers);
//Show details of the user
userRoutes.get("/:id", getUserById);
//Add users
userRoutes.post("/", createUser);

export default userRoutes;
