import conn from "../config/dbconfig";

const emprestimoTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS emprestimos(
        emprestimo_id INT primary key not null,
        livro_id int
        cliente_id int 
        data_emprestimo varchar(255) NOT NULL,
        data_evolucao varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on current_timestamp,
        foreign key (livro_id) references livros(livros_id)
        foreign key (cliente_id) references clientes(clientes_id)

    );`;

conn.query(emprestimoTable, (err,result,field)=>{
    if(err){
        return console.error(err.stack)
    }
    console.log("Tabela Funcionarios criada com sucesso")
})