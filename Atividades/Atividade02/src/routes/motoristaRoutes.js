import { Router } from "express"
import { pegarMotoristas, criarMotorista, pegarMotoristaPorId, deletarMotorista } from "../controllers/motoristaController.js"

const router = Router()

router.get('/', pegarMotoristas)
router.post('/', criarMotorista)
router.get('/:id', pegarMotoristaPorId)
router.delete('/:id', deletarMotorista)

export default router;