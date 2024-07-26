//criarOnibus, pegarOnibusPorId, pegarOnibus

import { Router } from "express"
import { criarOnibus, pegarOnibusPorId, pegarOnibus } from "../controllers/OnibusController.js"

const router = Router()

router.get('/', pegarOnibus)
router.post('/', criarOnibus)
router.get('/:id', pegarOnibusPorId)


export default router