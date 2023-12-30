import Router from "express";
import { getAllUsers } from "../controller/userController.js";
const userRoutes = Router();

userRoutes.get("/", getAllUsers);

export default userRoutes;
