const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const connection = mysql.createConnection({
    host: "dno6xji1n8fm828n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "acvebp7c1fkaw4qc",
    password: "y5ts6n2o7z3tisal",
    database: "xov0jp773idxt8vc"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

app.get('/', function(req, res){
    connection.query(
        "SELECT * FROM burgers",
        function(err, data){
            if(err) throw err;
            res.render('index', {food: data})
        }
    )
});

app.post('/api', function(req, res){
    connection.query(
        "INSERT INTO burgers SET ?",
        req.body,
        function(err, result){
            if(err) throw err;
            res.sendStatus(200);
        }
    )
});

app.put('/api/:id', function(req, res){
    let id = req.params.id
    connection.query(
        "UPDATE burgers SET devoured = true WHERE id = ?",
        id,
        function(err, result){
            if(err) throw err;
            res.sendStatus(200);
        }
    )
})

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT); 
});