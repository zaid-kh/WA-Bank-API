import Router from "express";
import {
  createUser,
  deleteUser,
  depositToUser,
  getAllUsers,
  getUserById,
  withdrawFromUser,
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
//Withdraw from user
userRoutes.put("/:id/withdraw", withdrawFromUser);
//Delete user
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
