import { Router } from "express";

const router = Router();

//localhost:3333/usuarios/register
router.post("/register", (request, response) => {
  console.log("A");
  response.send("Rota de usuários");
});

export default router;
