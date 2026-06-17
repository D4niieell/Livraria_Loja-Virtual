import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import routeCliente from "./src/routes/clientesRoutes.js";
import routerLivros from "./src/routes/livrosRoutes.js";
import routerCompras from "./src/routes/comprasRouter.js";
import routerCategoria from "./src/routes/categoriaRoutes.js";
import routerEditora from "./src/routes/editoraRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import coockieParser from "cookie-parser";
import loginRoute from "./src/routes/loginRoutes.js";

const app = express();

const PORT = process.env.PORT_SERVER || 8000;

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true, // obrigatório para cookies funcionarem
  })
);
app.use(express.json());
app.use(coockieParser());

app.use("/clientes", routeCliente);
app.use("/livros", routerLivros);
app.use("/compras", routerCompras);
app.use("/categorias", routerCategoria);
app.use("/editoras", routerEditora);
app.use("/users", userRouter);
app.use("/auth", loginRoute);

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${PORT}`);
});
