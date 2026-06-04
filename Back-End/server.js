import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import routeCliente from "./src/routes/clientesRoutes.js";
import routerLivros from "./src/routes/livrosRoutes.js";
import routerCompras from "./src/routes/comprasRouter.js";
import routerCategoria from "./src/routes/categoriaRoutes.js";
import routerEditora from "./src/routes/editoraRoutes.js";

const app = express();

const PORT = process.env.PORT_SERVER || 8000;

app.use(cors());
app.use(express.json());

app.use("/clientes", routeCliente);
app.use("/livros", routerLivros);
app.use("/compras", routerCompras);
app.use("/categorias", routerCategoria);
app.use("/editoras", routerEditora);

app.listen(PORT, () => {
    console.log(`Servidor rodando na ${PORT}`);
});


