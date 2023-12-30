import Router from "express";
import {
  createUser,
  depositToUser,
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
//Deposit to user
userRoutes.put("/:id/deposit", depositToUser);

export default userRoutes;
