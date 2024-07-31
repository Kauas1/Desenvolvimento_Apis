import jwt from "jsonwebtoken";

//Assincrono
const createUserToken = async (usuario, req,res) =>{
    //Criar o token
    const token = jwt.sign(
    {
        nome: usuario.nome,
        id: usuario.usuario_id
    }
    )
    //Retornar o token
}