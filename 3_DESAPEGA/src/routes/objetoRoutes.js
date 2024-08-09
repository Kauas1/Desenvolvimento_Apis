import { Router } from "express";

import { create, getAllObjectUser, getObjectById } from "../controllers/objetoControllers.js"

import imageUpload from "../helpers/image-upload.js";
import verifyToken from "../helpers/verify-token.js";

const router = Router()
router.post("/create", verifyToken, imageUpload.array("imagens", 10), create)
//listar todos os objetos
//listar todas as imagens de um objeto
//listar todos as iamgens que pertence ao usuario
//resgatar objeto pelo id
router.get("/usuarios/imagens", verifyToken,getAllObjectUser)
router.get("/usuarios/:id",getObjectById )
export default router;