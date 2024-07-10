import express from "express"
import {v4 as uuidv4} from 'uuid'
const PORT = 3333

const app = express();


//Aceitar JSON
app.use(express.json());

// Rotas
/** Request HTTP
 * query params - ...:3333/pessoas?nome="Kaua"&idade=17
 *  Rotas do tipo GET (criação de filtros e buscas)
 * route params - ...:3333/pessoas/5
 *  Rotas do tipo GET, PUT, PATCH, DELETE (listar um elemento)
 * body params - ...:3333/pessoas
 *  Rotas do tipo POST (Cadastro de informações)
 */

// Middleware
const logRoutes = (request, response , next) =>{
    const {url, method} = request
    const rota = `[${method.toUpperCase()}] ${url}`
    console.log(rota)
    next()
};

// Middleware para todas as rotas
app.use(logRoutes)

// query params
const users = []
app.get("/users", (request, response)=>{
    response.status(200).json(users) 
});

// Body Params
app.post("/users", (request, response)=>{
    const {nome, idade} = request.body

    // validações
    if(!nome){
        response.status(400).json({message: "Nome é obrigatorio"})
        return
    }

    if(!idade){
        response.status(400).json({message: "A idade é obrigatoria"})
        return
    }

    const user = {
        id: uuidv4(),
        nome,
        idade
    }
    users.push(user)

    response.status(201).json({message: "Usuário cadastrado", 
    user
}); 
});

// Routes Params
app.put("/users/:id", (request, response)=>{
    const {id} = request.params
    const {nome, idade} = request.body

    const index = users.findIndex((user)=> user.id === id)

    if(index === -1){
        return response.status(404).json({message:"Usuário não encontrado."})
    }

    if(!nome || !idade){
        return response.status(400).json({message:"nome e idade são campos obrigatórios."})
    }
    const updtUser ={
        id,
        nome,
        idade
    }

    users[index] = updtUser
    response.status(201).json(updtUser) 
});

app.delete("/users/:id", (request, response)=>{
    const id = request.params.id
    
    const indexUser = users.findIndex((user)=> user.id == id)
    if(indexUser === -1){
        response.status(404).json({message: "Usuário não encontrado"})
        return
    }

    users.splice(indexUser,1)
    response.status(204).send("apagado")
});


app.listen(PORT, ()=>{
    console.log("Servidor on PORT " + PORT)
});