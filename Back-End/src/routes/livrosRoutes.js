import express from "express";
const routerLivros = express.Router();

import LivrosController from "../controllers/livrosController.js"

routerLivros.get('/', LivrosController.showLivro);
routerLivros.get('/:id', LivrosController.getLivroById);
routerLivros.post('/', LivrosController.createLivro);
routerLivros.put('/:id', LivrosController.updateLivro);
routerLivros.delete('/:id', LivrosController.deleteLivro);

export default routerLivros;