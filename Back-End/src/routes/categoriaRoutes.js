import express from "express";

import categoriaController from "../controllers/categoriaController.js";

const routerCategoria = express.Router();

routerCategoria.get("/", categoriaController.showCategorias);
routerCategoria.get("/:id", categoriaController.getCategoriaById);
routerCategoria.post("/", categoriaController.createCategoria);
routerCategoria.put("/:id", categoriaController.updateCategoria);
routerCategoria.delete("/:id", categoriaController.deleteCategoria);

export default routerCategoria;
