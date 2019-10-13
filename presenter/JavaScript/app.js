const express = require('express'); //para fzr o backend
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

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

app.get("/subArtigo", function (req, res) {
	res.sendFile(path.resolve("../../view/subArtigo.html"));

});

app.get("/cadastrarEvento", function (req, res) {
	res.sendFile(path.resolve("../../view/cadastroEventoView.html"));
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

app.post('/cadasA', function (req, res) {
	var nome = req.body.nome;
	var email = req.body.email;
	var senha = req.body.senha;
	var instituicao = req.body.instituicao;
	var matricula = req.body.matricula;

	connection.query("INSERT INTO `aluno` (nome, email, senha, instituicao,matricula) VALUES (?,?,?,?,?)", [nome.toString(), email.toString(), senha.toString(), instituicao.toString(), matricula.toString()], function (err, result) {
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

app.post('/subArtigo', function (req, res) {

	var titulo = req.body.titulo;
	var nome = req.body.nome;
	var email = req.body.email;
	var resumo = req.body.resumo;

	connection.query("INSERT INTO `artigo` (titulo, resumo,nome,email) VALUES (?,?,?,?)", [titulo, nome, email, resumo], function (err, result) {
		if (err) throw err;
	});

	res.redirect('/home');
});

app.post('/cadasE', function (req, res) {

	var nome = req.body.nome;
	var sigla = req.body.sigla;
	var data_in = req.body.data_in;
	var data_fn = req.body.data_fn;
	var data_sub_in = req.body.data_sub_in;
	var data_sub_fn = req.body.data_sub_fn;
	var area_conc = req.body.area_conc;
	var situacao = req.body.situaco;

	connection.query("INSERT INTO `eventos` (nome, sigla, data_in, data_fn, data_sub_in, data_sub_fn, area_conc, situacao) VALUES (?,?,?,?,?,?,?,?)", [nome, sigla, data_in, data_fn, data_sub_in, data_sub_fn, area_conc, situacao], function (err, result) {
		if (err) throw err;
	});

	res.redirect('/home');
});
// PORTA
app.listen(8081, function () { console.log("Servidor ligado"); });