import "dotenv/config" ;
import express, {application, response} from "express";
import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Sen@iDev77!.',
    database:'empresa_atividade', 
    port: 3306
})

conn.connect((err)=>{
    if(err){
        return console.error(err.stack);
    };
    
    console.log("MySql Conectado");

    app.listen(PORT, ()=>{
        console.log('servidor na port', PORT);
    });
});

/*Rotas de Livros */
app.get("/livros", (request, response)=>{
    //query para banco de dados(consulta)
    const sql = /*sql*/`SELECT * FROM livros`;

    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message:'Erro ao buscar livros'});
            return console.log(err);
        };

        const livros = data;
        response.status(200).json(livros);
    });
});

app.post('/livros', (request, response)=>{
    const {titulo, autor, ano_publicacao, genero, preco} = request.body;

    //validacoes
    if(!titulo){
        response.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!autor){
        response.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!ano_publicacao){
        response.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!genero){
        response.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!preco){
        response.status(400).json({message: 'Campo obrigatório'});
        return 
    };


    // Logo abaixo viria o FS.
//Cadastrar um livro -> antes preciso saber se este livro existe
    const checkSql = /*sql*/ `
    SELECT * FROM livros 
    WHERE titulo = "${titulo}" AND 
    autor = "${autor}" AND 
    ano_publicacao = "${ano_publicacao}"`;

    conn.query(checkSql, (err, data)=>{
        if(err){
            response.status(500).json({message:'Erro ao buscar livros'});
            return console.log(err);
        };

        if(data.length > 0){
            response.status(409).json({message:"Esse livro já existe na livraria"});
            return console.log(err);
        }

        const id = uuidv4()
        const disponibilidade = 1

        const insertSql = /*sql*/`INSERT INTO livros(id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
        VALUES("${id}", "${titulo}", "${autor}", "${ano_publicacao}", "${genero}","${preco}","${disponibilidade}")`

        conn.query(insertSql, (err) =>{
            if(err){
                response.status(500).json({message:'Erro ao cadastar livro'});
                return console.log(err);
            };

            response.status(201).json({message:'Livro cadastrado'})
        })


    });
});

// Listar um livro 
app.get('/livros/:id', (request, response)=>{
    const {id} = request.params

    const sql = /*sql*/ `
    SELECT * FROM livros WHERE id = "${id}"`
    
    conn.query(sql, (err, data)=>{
        if(err){
        console.error(err)
        response.status(500).json({message: "Erro ao buscar os Dados."})
        return
        }

        if(data.length === 0){
        return response.status(404).json({message: "Livro não encontrado."})
        }

        const livro = data[0]
        response.status(200).json(livro)
    })
})


app.put('/livros/:id', (request, response)=>{
    const {id} = request.params

    const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = request.body;

// Validações
if(!titulo){
    response.status(400).json({message: 'Campo obrigatório'});
    return 
} else if(!autor){
    response.status(400).json({message: 'Campo obrigatório'});
    return 
} else if(!ano_publicacao){
    response.status(400).json({message: 'Campo obrigatório'});
    return 
} else if(!genero){
    response.status(400).json({message: 'Campo obrigatório'});
    return 
} else if(!preco){
    response.status(400).json({message: 'Campo obrigatório'});
    return 
}

if(disponibilidade === undefined){
    response.status(400).json({message: 'A disponibilidade é obrigatória.'})
    return;
}

const checkSql = /*sql*/ ` SELECT * FROM livros WHERE id = "${id}"`
conn.query(checkSql,(err,data)=>{
    if(err){
        console.error(err)
        response.status(500).json({message:"Erro ao ler os Dados."})
    }

    if(data.length === 0){
        return response.status(404).json({message: "Livro não encontrado."})
    }

    // Consulta SQL para atualizar livro

    const updateSql = /*sql*/ `
    UPDATE livros 
    SET titulo = "${titulo}", autor = "${autor}", ano_publicacao = "${ano_publicacao}", genero = "${genero}", preco = "${preco}", disponibilidade = "${disponibilidade}"
    WHERE id = "${id}"`
    
    conn.query(updateSql, (err)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao atualizar os livros"})
            return
        }

        response.status(200).json({message: "Livro atualizado."})
    })
})
})


app.delete('/livros/:id', (request, response)=>{
    const {id} = request.params

    const deleteSql = /*sql*/`
    DELETE FROM livros WHERE id = "${id}"
    `

    conn.query(deleteSql, (err, info)=>{
        if(err){
            console.error(err)
            response.status(500).json({message:"Erro ao deletar o livro"})
            return
        }

        if(info.affectedRows === 0){
            response.status(404).json({message:"Erro não encontrado."})
            return
        }

        response.status(200).json({message: "Livro Selecionado foi deletado."})
    })
})


/* id, nome, cargo, data_contratacao, salario, email, created_at, updated_at*/








//Rota 01 -> lista todos
app.get('/funcionarios', (request, response)=>{
    const checkSql =  /*sql*/ `
    SELECT * FROM funcionarios
    `

    conn.query(checkSql, (err,data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao analisar os dados"})
            return
        }

        const funcionarios = data
        response.status(200).json(funcionarios)
    })
})

//Rota 02 -> cadastra Funcionário(Único email por funcionário)
app.post('/funcionarios', (request, response)=>{
    const {nome, cargo, data_contratacao, salario, email} = request.body

    if(!nome){
        response.status(400).json({message: 'O nome é obrigatório'});
        return 
    } else if(!cargo){
        response.status(400).json({message: 'O cargo é obrigatório'});
        return 
    } else if(!data_contratacao){
        response.status(400).json({message: 'A data de contratação é obrigatório'});
        return 
    } else if(!salario){
        response.status(400).json({message: 'Salário é obrigatório'});
        return 
    } else if(!email){
        response.status(400).json({message: 'Email é obrigatório'});
        return 
    };

    const checkSql = /*sql*/ `
    SELECT * FROM funcionarios WHERE nome = "${nome}" AND cargo = "${cargo}" AND data_contratacao = "${data_contratacao}" AND salario = "${salario}"AND email = "${email}"`;

    conn.query(checkSql, (err)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao criar o funcionário."})
            return
        }

        if(email.length > 0 ){
            response.status(404).json({message: "Email já registrado."})
            return
        }

        
        const id = uuidv4()

        const insertSql = /*sql*/`INSERT INTO funcionarios(id, nome, cargo, data_contratacao, salario, email)
        VALUES("${id}", "${nome}", "${cargo}", "${data_contratacao}", "${salario}", "${email}")`

        conn.query(insertSql, (err) =>{
            if(err){
                response.status(500).json({message:'Erro ao cadastar oo funcionário'});
                return console.log(err);
            };

            response.status(201).json({message:'Funcionário cadastrado'})
        })
    })
})

//Rota 03 -> Listar UM (1) funcionário
app.get('/funcionarios/:id', (request, response)=>{
    const {id} = request.params

    const sql = /*sql*/ `
    SELECT * FROM funcionarios WHERE id = "${id}"`
    
    conn.query(sql, (err, data)=>{
        if(err){
        console.error(err)
        response.status(500).json({message: "Erro ao buscar os Dados."})
        return
        }

        if(data.length === 0){
        return response.status(404).json({message: "Funcionario não encontrado."})
        }

        const funcionario = data[0]
        response.status(200).json(funcionario)
    })
})

//Rota 04 -> Atualizar UM (1) funcionário
app.put('/funcionarios/:id', (request, response)=>{
    const {id} = request.params

    const {nome, cargo, data_contratacao, salario, email} = request.body

    if(!nome){
        response.status(400).json({message: 'O nome é obrigatório'});
        return 
    } else if(!cargo){
        response.status(400).json({message: 'O cargo é obrigatório'});
        return 
    } else if(!data_contratacao){
        response.status(400).json({message: 'A data de contratação é obrigatório'});
        return 
    } else if(!salario){
        response.status(400).json({message: 'Salário é obrigatório'});
        return 
    } else if(!email){
        response.status(400).json({message: 'Email é obrigatório'});
        return 
    };

    const checkSql = /*sql*/ `
    SELECT * FROM funcionarios WHERE id = "${id}"
    `

    conn.query(checkSql, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao ler os dados."})
        }

        if(data.length === 0){
            response.status(404).json({message: "Erro ao achar o funcionário."})
        }

        const updateSql = /*sql*/ `
        UPDATE funcionarios 
        SET nome = "${nome}", cargo = "${cargo}", data_contratacao = "${data_contratacao}", salario = "${salario}", email = "${email}"
        WHERE id = "${id}"`

        conn.query(updateSql, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao ler os dados."})
                return
            }

            response.status(200).json({message: "Funcionário atualizado."})
        })
    })
})

//Rota 05 -> Deletar UM (1) funcionário
app.delete('/funcionarios/:id', (request, response) => {
const {id} = request.params
    
    const deleteSql = /*sql*/`
    DELETE FROM funcionarios WHERE id = "${id}"
    `
    
    conn.query(deleteSql, (err, info)=>{
        if(err){
            console.error(err)
            response.status(500).json({message:"Erro ao deletar o funcionário."})
            return
        }
    
        if(info.affectedRows === 0){
            response.status(404).json({message:"Erro não encontrado."})
            return
        }
    
        response.status(200).json({message: "O funcionário Selecionado foi deletado."})
    })
    
    /*Rota 404*/
    app.use((request, response)=>{
        response.status(404).json({message:"Não encontrado"});
})
});