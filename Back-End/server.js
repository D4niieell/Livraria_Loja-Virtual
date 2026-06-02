import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routeCliente from "./src/routes/clientesRoutes.js";
import routerLivros from "./src/routes/livrosRoutes.js";
import routerCompras from "./src/routes/comprasRouter.js";
import routerCategoria from "./src/routes/categoriaRoutes.js";
import routerEditora from "./src/routes/editoraRoutes.js";


// Passo 3 - carregar varísveis de ambiente
dotenv.config();

// Passo 1 - crisr instância do app
const app = express();

// Passo 4 - Definir a porta
const PORT = process.env.PORT_SERVER || 8000;

// Passo 5 - Resgatar middlewares
app.use(cors());
app.use(express.json());

// Passo 6 - Importar arquivos de rotas
app.use("/clientes", routeCliente);
app.use("/livros", routerLivros);
app.use("/compras", routerCompras);
app.use("/categorias", routerCategoria);
app.use("/editoras", routerEditora);


// Passo 8 - Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na ${PORT}`);
});


