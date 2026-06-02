import express from "express"
import categoriaController from "../controllers/categoriaController.js"

const routerCategoria = express.Router();


routerCategoria.get('/', categoriaController.showCategorias);
// routerCategoria.get('/:id', categoriaController.getById);
// routerCategoria.post('/', categoriaController.create);
// routerCategoria.put('/:id', categoriaController.update);
// routerCategoria.delete('/:id', categoriaController.delete);

export default routerCategoria;