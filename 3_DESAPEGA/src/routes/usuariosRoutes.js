import { Router } from "express";
import { registerUser, login, checkUser } from "../controllers/userControllers.js";
import validarUsuario from "../helpers/validateUser.js";
import conn from "../config/conn.js";
const router = Router();

//localhost:3333/usuarios/register
router.post("/register", validarUsuario, registerUser)
router.post("/login", login)
router.get("/:id", checkUser)



export default router;
