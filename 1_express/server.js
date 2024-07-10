import express from "express"
const PORT = 3333

const app = express()


//Aceitar JSON
app.use(express.json())

// Rotas
/** Request HTTP
 * query params - ...:3333/pessoas?nome="Kaua"&idade=17
 *  Rotas do tipo GET (criação de filtros e buscas)
 * route params - ...:3333/pessoas/5
 *  Rotas do tipo GET, PUT, PATCH, DELETE (listar um elemento)
 * body params - ...:3333/pessoas
 *  Rotas do tipo POST (Cadastro de informações)
 */
// query params
app.get("/users", (request, response)=>{
    // const query = request.query // Recomendável usar o de cima
    // console.log(query)
    const {nome, idade} = request.query //Desestruturar o query params
    console.log(nome, idade)
    response.status(201).json([
        "Pessoa 1",
        "Pessoa 2",
        "Pessoa 3",
        "Pessoa 4"
    ]) 
})
// Body Params
app.post("/users", (request, response)=>{
    // const body = request.body
    // console.log(body)
    const {nome, idade} = request.body
    console.log(nome,idade)
    response.status(201).json([
        "Pessoa 1",
        "Pessoa 2",
        "Pessoa 3",
        "Pessoa 4"
    ]) 
})

// Routes Params
app.put("/users/:id/:cpf", (request, response)=>{
    // 1
    // const id = request.params.id
    // const cpf = request.params.cpf
    const {id,cpf} = request.params
    console.log(id,cpf)
    response.status(201).json([
        "Pessoa 1",
        "Pessoa 10",
        "Pessoa 3",
        "Pessoa 4"
    ]) 
})

app.delete("/users", (request, response)=>{
    response.status(200).json([
        "Pessoa 10",
        "Pessoa 3",
        "Pessoa 4"
    ]) 
})


app.listen(PORT, ()=>{
    console.log("Servidor on PORT " + PORT)
})