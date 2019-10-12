const express = require('express'); //para fzr o backend
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

var alunoAtual;

//mudar o usuario e a senha de acordo com o seu mysql
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'apsjob'
});

connection.connect(function (err) {
	if (err) {
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//para usar o css,imagens,etc colocar o diretorio onde as pastas estao
app.use(express.static(path.resolve("../../")));

//  GETS
app.get("/login", function (req, res) {
	res.sendFile(path.resolve("../../index.html"));
});

app.get("/cadastroaluno", function (req, res) {
	res.sendFile(path.resolve("../../view/cadastroAluno.html"));
});

app.get("/cadastroprof", function (req, res) {
	res.sendFile(path.resolve("../../view/cadastroProf.html"));
});

app.get("/home", function (req, res) {
    res.sendFile(path.resolve("../../view/home.html"));
});

app.get("/editarCadastro", function (req, res) {
	res.sendFile(path.resolve("../../view/editarCadastro.html"));
});

// POST
app.post('/auth', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM login WHERE usuario = ? AND senha = ?', [username, password], function (error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
                request.session.username = username;
                alunoAtual = username;
				response.redirect('/home');
			} else {
				response.send('Usuário ou senha incorreto');
			}
			response.end();
		});
	} else {
		response.send('Digite usuário ou senha');
		response.end();
	}
});

app.post('/cadasA', function (req, res) {
	var nome = req.body.nome;
	var email = req.body.email;
	var senha = req.body.senha;
	var instituicao = req.body.instituicao;
	var matricula = req.body.matricula;

	connection.query("INSERT INTO `aluno` (nome, email,instituicao,matricula) VALUES (?,?,?,?)", [nome.toString(), email.toString(), instituicao.toString(), matricula.toString()], function (err, result) {
		if (err) throw err;
	});

	connection.query("INSERT INTO `login` (usuario, senha) VALUES (?,?)", [email.toString(), senha.toString()], function (err, result) {
		if (err) throw err;
	});

	res.redirect('/login');
});

app.post('/cadasP', function (req, res) {
	var nome = req.body.nome;
	var email = req.body.email;
	var senha = req.body.senha;
	var titulacao = req.body.titulacao;
	var instituicao = req.body.instituicao;
	var areadepesquisa = req.body.areadepesquisa;

	connection.query("INSERT INTO `professor` (nome, email,instituicao,titulacao,area_pesq) VALUES (?,?,?,?,?)", [nome, email, instituicao, titulacao, areadepesquisa], function (err, result) {
		if (err) throw err;
	});

	connection.query("INSERT INTO `login` (usuario, senha) VALUES (?,?)", [email, senha], function (err, result) {
		if (err) throw err;
	});

	res.redirect('/login');
});

// PUT
app.put('/editarA', function (req, res) {
	var nome = req.body.nome;
	var email = req.body.email;
	var senha = req.body.senha;
	var instituicao = req.body.instituicao;
	var matricula = req.body.matricula;

	connection.query("UPDATE `aluno` SET (nome, email,instituicao,matricula) VALUES (?,?,?,?) WHERE 'aluno' ==" [alunoAtual], [nome.toString(), email.toString(), instituicao.toString(), matricula.toString()], function (err, result) {
		if (err) throw err;
    });
    
	connection.query("UPDATE `login` SET (usuario, senha) VALUES (?,?) WHERE `login` == " [alunoAtual], [email.toString(), senha.toString()], function (err, result) {
		if (err) throw err;
	});

	res.redirect('/home');
});

// PORTA
app.listen(8081, function () { console.log("Servidor ligado"); });