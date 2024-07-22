import "dotenv/config";
import express, { json } from "express";

const PORT = 3333;


import "./models/livroModel.js";
import "./models/funcionarioModel.js";
import "./models/usuariosModel.js";

import livroRoutes from "./routes/livroRoutes.js";


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/livros", livroRoutes);
app.use("/funcionarios", funcionariosRoutes);
app.use("/clientes", clientesRoutes);

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`);
});
