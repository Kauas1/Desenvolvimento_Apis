import "dotenv/config";
import express from "express";
import path from "node:path"
import {fileURLToPath} from "node:url"
const PORT = 3333;

//Importar conexão
import conn from "./config/conn.js";

//Importação dos módulos (TABELA)
import "./models/usuarioModel.js";

//Importar as rotas
import usuarioRouter from "./routes/usuariosRoutes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//localizar onde está as pasta public
app.use("/public", express.static(path.join(__dirname, "public")))



//Utilizar a rotas
app.use("/usuarios", usuarioRouter);

//404
app.use((request, response) => {
  response.status(404).json({ message: "Recurso não entrado" });
});

app.listen(PORT, () => {
  console.log("Servidor on PORT " + PORT);
});
