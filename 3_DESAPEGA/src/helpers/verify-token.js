import jwt from "jsonwebtoken"
import getToken from "./get-token.js";

const verifyToken = (req,res, next) =>{
    if(!req.headers.authorization){
        res.status(401).json({err: "Acesso negado"})
        return;
    }
    
    const token = getToken(req)
    if(!token){
        res.status(401).json({err: "Acesso negado"})
        return;
    }

    try {
        const verified = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL")
        req.usuario = verified
        next()
    } catch (error) {
        res.status(400).json({err: "Token é inválido."})
    }

};

export default verifyToken;