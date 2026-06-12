import express from "express";
import LivrosController from "../controllers/livrosController.js";

const routerLivros = express.Router();

routerLivros.get("/", LivrosController.showLivros);
routerLivros.get("/:id", LivrosController.getLivroById);
routerLivros.post("/", LivrosController.createLivro);
routerLivros.put("/:id", LivrosController.updateLivro);
routerLivros.delete("/:id", LivrosController.deleteLivro);

export default routerLivros;
