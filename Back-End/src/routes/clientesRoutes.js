import express from "express";
import clientesController from "../controllers/clientesController.js";

const routeCliente = express.Router();

routeCliente.get("/", clientesController.showClientes);
routeCliente.get("/:email", clientesController.getClienteByEmail);
routeCliente.post("/", clientesController.createCliente);
routeCliente.put("/:id", clientesController.updateCliente);
routeCliente.delete("/:id", clientesController.deleteCliente);

export default routeCliente;
