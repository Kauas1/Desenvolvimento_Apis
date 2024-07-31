import "dotenv/config";
import express from "express";

const PORT = 3333;

//Importar conexão
import conn from "./config/conn.js";

//Importação dos módulos (TABELA)
import "./models/usuariosModel.js";

//Importar as rotas
import usuarioRouter from "./routes/usuariosRoutes.js";

const app = express();

app.use(urlencoded({extended:true}))
app.use(json()); 

app.get("/", (req, res) => {
  res.send("olá, ");
});

//Utilizar a rotas
app.use("/usuarios", usuarioRouter);

//404
app.use((request, response) => {
  response.status(404).json({ message: "Recurso não entrado" });
});

app.listen(PORT, () => {
  console.log("Servidor on PORT " + PORT);
});
