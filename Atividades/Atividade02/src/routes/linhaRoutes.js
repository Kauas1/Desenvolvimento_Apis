import { Router } from "express"
import { pegarLinha, criarLinha, editarLinha, pegarLinhaPorId } from "../controllers/linhaOnibusController.js"

const router = Router()

router.get('/', pegarLinha)
router.post('/', criarLinha)
router.get('/:id', pegarLinhaPorId)
router.put('/:id', editarLinha)

export default router;