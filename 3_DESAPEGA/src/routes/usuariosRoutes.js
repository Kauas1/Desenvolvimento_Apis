import { Router } from "express";
import { registerUser, login, checkUser, getUserById, editUser } from "../controllers/userControllers.js";
import validarUsuario from "../helpers/validateUser.js";
import verifyToken from "../helpers/verify-token.js"
import conn from "../config/conn.js";
const router = Router();

//localhost:3333/usuarios/register
router.post("/register", validarUsuario, registerUser)
router.post("/login", login)
router.get("/checkuser", checkUser) // Auxiliar Front-End
router.get("/:id", getUserById)
// Verificar se está logado e upload imagem para perfil
router.put("/edit/:id", verifyToken, editUser)

export default router;
