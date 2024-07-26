
import express, { json } from 'express';

const PORT = 3333;

import "./models/motoristaModel.js"
import "./models/OnibusModel.js"
import "./models/linhaOnibusModel.js"

import motoristaRouter from './routes/motoristaRoutes.js';
import onibusRoutes from './routes/onibusRoutes.js'
import linhaRoutes from './routes/linhaRoutes.js'
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use("/motoristas", motoristaRouter);
app.use("/onibus", onibusRoutes)
app.use("/linhas", linhaRoutes)
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})