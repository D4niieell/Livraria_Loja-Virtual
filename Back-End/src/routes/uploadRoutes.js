import express from "express";
import upoload from "../middlewares/uploadMiddlewares.js";
import uploadController from "../controllers/uploadController.js";
import upload from "../middlewares/uploadMiddlewares.js";

const uploadRoutes = express.Router();

uploadRoutes.post("/", upload.single("image"), uploadController.uploadImage)

export default uploadRoutes;