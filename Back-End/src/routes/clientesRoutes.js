import express from "express";
import clientesController from "../controllers/clientesController.js";
import {
    authenticationToken,
    adminRole,
} from "../middlewares/authLoginMiddlewares.js";

const routeCliente = express.Router();

routeCliente.get(
    "/",
    authenticationToken,
    adminRole("admin"),
    clientesController.showClientes,
);

routeCliente.get("/:id", clientesController.getClienteById);
routeCliente.get("/:email", clientesController.getClienteByEmail);
routeCliente.post("/", clientesController.createCliente);
routeCliente.put("/:id", clientesController.updateCliente);
routeCliente.delete("/:id", clientesController.deleteCliente);

export default routeCliente;