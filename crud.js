const express = require("express")
const mysql = require("mysql")

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const connection = mysql.createConnection({
    host: "localhost",
    user: "luis",
    password: "123",
    database: "teste",

})

connection.connect(function (error){
    if (error) return console.log (error)
    console.log("database conectada")
})
function criartabela(connection){
 
    const sql = 'CREATE TABLE IF NOT EXISTS Clientes(ID int NOT NULL AUTO_INCREMENT, nome varchar(150) NOT NULL, telefone char(15) NOT NULL, PRIMARY KEY(ID))'
    
    connection.query(sql, function (error, results, fields){
        if(error) return console.log(error);
    });
}
criartabela(connection)

const router = express.Router()
router.get("/", (req, res) => {
    res.json("ola")
})
app.use("/", router)
router.get("/clientes", (req,res) => {
    connection.query("SELECT * FROM Clientes", function(error, resultado, fields){
        if (error) res.json({erro: error})
        else res.json(resultado)
    })
})
router.get("/clientes/:id", (req,res)=> {
    connection.query("SELECT * FROM Clientes WHERE ID=" + parseInt(req.params.id), function(error, resultado, fields){
        if (error) res.json({erro: error})
        else res.json(resultado)
    })

})
router.delete("/clientes/:id",(req,res)=>{
    connection.query("DELETE FROM Clientes WHERE ID=" + parseInt(req.params.id), function(error, resultado, fields){
        if (error) res.json({erro: error})
        else res.json("usuario deletado")
    })
    
})
router.post("/clientes", (req,res)=>{
    
    connection.query("INSERT INTO Clientes (nome, telefone) VALUES (?,?)", [req.body.nome, req.body.telefone], function(error, resultado, fields){
        if (error) res.json({erro: error})
        else res.json("usuario criado")
    })
})
router.put("/clientes/:id", (req,res)=> {
    
    connection.query("UPDATE Clientes SET nome = ?, telefone = ? WHERE ID=" + parseInt(req.params.id), [req.body.nome, req.body.telefone], function(error, resultado, fields){
        if (error) res.json({erro: error})
        else res.json("usuario atualizado")
    })


})


app.listen(3000)


