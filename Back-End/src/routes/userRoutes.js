import express from "express";
import userController from "../controllers/userController.js";
import validateUser from "../middlewares/validateUser.js";
import { authenticationToken } from "../middlewares/authLoginMiddlewares.js";

const userRouter = express.Router();

userRouter.get("/", authenticationToken, userController.getAllUsers);
userRouter.get(
  "/user_id/:user_id",
  authenticationToken,
  userController.getUsersById
);
userRouter.get(
  "/email/:user_email",
  authenticationToken,
  userController.getUserByEmail
);
userRouter.post(
  "/",
  validateUser,
  authenticationToken,
  userController.createUser
);
userRouter.put(
  "/:user_id",
  validateUser,
  authenticationToken,
  userController.updateUser
);
userRouter.delete("/user_id", authenticationToken, userController.deleteUser);

export default userRouter;
