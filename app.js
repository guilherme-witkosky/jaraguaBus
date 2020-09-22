const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

const sql = mysql.createConnection({
    host: 'teste.cj2pmogkofj2.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    port: 3306
});

sql.query("use nodemysql");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/estilo'));
app.use(express.static(__dirname + '/script'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/contato', (req,res)=>{
    res.sendFile(__dirname + '/contato.html');
});

app.get('/cartoes', (req,res)=>{
    res.sendFile(__dirname + '/cartoes.html');
});

app.get('/rotas', (req,res)=>{
    res.sendFile(__dirname + '/rotas.html');
});

app.get('/lista', (req,res)=>{
    res.sendFile(__dirname + '/lista.html');
});

app.post('/contato', (req,res)=>{
    sql.query("insert into cadastro values (?,?,?,?)",[ ,req.body.nome, req.body.email, req.body.coment]);
    res.redirect('/contato');
});

app.get('/select/:parametro?', (req,res)=>{
    if(!req.params.parametro){
        sql.query("select * from cadastro order by id",(err, results, filds)=>{
            res.json(results);
    });
    }else {
        sql.query("select * from cadastro where id = ?",[req.params.parametro],(err, results, filds)=>{
            res.json(results);
        });
    }
}); 

app.get('/select/nome/:parametro?', (req,res)=>{
    sql.query("select * from cadastro where nome = ?",[req.params.parametro],(err, results, filds)=>{
        res.json(results);
    });
    
});

app.get('/select/email/:parametro?', (req,res)=>{
    sql.query("select * from cadastro where email = ?",[req.params.parametro],(err, results, filds)=>{
        res.json(results);
    });
    
});

app.get('/select/coment/:parametro?', (req,res)=>{
    sql.query("select * from cadastro where coment = ?",[req.params.parametro],(err, results, filds)=>{
        res.json(results);
    });
    
});

app.get('/update/:nome/:email/:coment/:id', (req,res)=>{
    sql.query("update cadastro set nome = ?, email = ?, coment = ? where id = ?",[req.params.nome, req.params.email, req.params.coment, req.params.id],(err, results, filds)=>{
        res.redirect('/lista');
    });
});

app.get('/delete/:id',(req,res)=>{
    sql.query("delete from cadastro where id = ?",[req.params.id],(err,results,filds)=>{
        res.redirect('/lista');
    })
});

app.listen(8081, ()=>{
    console.log('Servidor rodando!');
});
