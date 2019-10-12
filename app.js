const express =require('express'); //para fzr o backend
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

//mudar o usuario e a senha de acordo com o seu mysql
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'apsjob'
});

connection.connect(function(err){
	if(err){
	  console.log('Error connecting to Db');
	  return;
	}
	console.log('Connection established');
  });
  

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//para usar o css,imagens,etc colocar o diretorio onde as pastas estao
 app.use(express.static("C:\\Users\\João Victor\\Desktop\\APS-HTML-developer"));

//ler html, colocar o diretorio e indicar o arquivo html
app.get("/login",function(req,res){
    res.sendfile("index.html");
});

app.post('/auth', function(request, response){
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM login WHERE usuario = ? AND senha = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.post('/cadasA', function(req,res) {
  var nome = req.body.nome;
	var email = req.body.email;
	var senha = req.body.senha;
	var instituicao = req.body.instituicao;
	var matricula = req.body.matricula;

	connection.query("INSERT INTO `aluno` (nome, email,instituicao,matricula) VALUES (?,?,?,?)", [nome.toString(), email.toString(),instituicao.toString(),matricula.toString()], function(err, result) {
		if(err) throw err;
	});

	connection.query("INSERT INTO `login` (usuario, senha) VALUES (?,?)", [email.toString(), senha.toString()], function(err, result) {
    if(err) throw err;
	});
	
  res.redirect('/login');
});


app.get("/cadastroaluno",function(req,res){
    res.sendfile("cadastroaluno.html" );
});

app.get("/cadastrarprof",function(req,res){
    res.sendfile("cadastrarprof.html" );
});

app.get("/home",function(req,res){
    res.sendfile("home.html" );
});


app.listen(8081, function(){console.log("Servidor ligado");});