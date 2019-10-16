const express = require('express'); //para fzr o backend
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

//Global var
var tipo_user_atual;
var login;

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

app.get("/cadastroadmin", function (req, res) {
    res.sendFile(path.resolve("../../view/cadastroAdmin.html"));
});

app.get("/homeAluno", function (req, res) {
    res.sendFile(path.resolve("../../view/homeAluno.html"));
});

app.get("/homeProf", function (req, res) {
    res.sendFile(path.resolve("../../view/homeProf.html"));
});

app.get("/homeAdmin", function (req, res) {
    res.sendFile(path.resolve("../../view/homeAdmin.html"));
});

app.get("/editarCadastroA", function (req, res) {
    res.sendFile(path.resolve("../../view/editarCadastroAluno.html"));
});

app.get("/editarCadastroP", function (req, res) {
    res.sendFile(path.resolve("../../view/editarCadastroProf.html"));
});

app.get("/subArtigo", function (req, res) {
    res.sendFile(path.resolve("../../view/subArtigo.html"));

});

app.get("/cadastrarEvento", function (req, res) {
    res.sendFile(path.resolve("../../view/cadastroEventoView.html"));
});

app.get("/verEventos", function (req, res) {
    res.sendFile(path.resolve("../../view/eventView.html"));
});

app.get("/verArtigo", function (req, res) {
    res.sendFile(path.resolve("../../view/verArtigo.html"));
});

app.get("/indicarRevisorArtigo", function (req, res) {
	res.sendFile(path.resolve("../../view/indicarRevisorArtigo.html"));
});

app.get("/indicarRevisorConferencia", function (req, res) {
	res.sendFile(path.resolve("../../view/indicarRevisorConferencia.html"));
});

/* End */

/* POST para efetuar uma busca no bd */

app.post('/searchEvent', function (request, response) {
    var nome = request.body.nome;

    console.log(nome);

    connection.query('SELECT * FROM eventos WHERE nome = ?', [nome], function (error, results, fields) {
        if (results.length > 0) {
            var textHTML = "";
            var setEvent = require("../../model/eventModel");
            setEvent = setEvent(results[0].nome, results[0].sigla, results[0].data_in, results[0].data_fn,
                results[0].data_sub_in, results[0].data_sub_fn, results[0].area_conc);
            console.log("To no app.js");
            setEvent = JSON.stringify(setEvent);
            setEvent = JSON.parse(setEvent);
            console.log(setEvent);

            textHTML += "<table border='1'>\n"
            /* Creating table */
            /* Creating index */
            textHTML += "\t<tr>\n"
            textHTML += "\t\t<th>" + "Nome" + "</th>\n";
            textHTML += "\t\t<th>" + "Sigla" + "</th>\n";
            textHTML += "\t\t<th>" + "Data de inicio" + "</th>\n";
            textHTML += "\t\t<th>" + "Data de final" + "</th>\n";
            textHTML += "\t\t<th>" + "Data de inicio das submissões" + "</th>\n";
            textHTML += "\t\t<th>" + "Data de fim das submissões" + "</th>\n";
            textHTML += "\t\t<th>" + "Área de concentração" + "</th>\n";
            textHTML += "\t</tr>\n"

            /* Creating body */
            textHTML += "\t<tr>\n"
            textHTML += "\t\t<td>" + setEvent.nome + "</td>\n";
            textHTML += "\t\t<td>" + setEvent.sigla + "</td>\n";
            textHTML += "\t\t<td>" + setEvent.data_in + "</td>\n";
            textHTML += "\t\t<td>" + setEvent.data_fn + "</td>\n";
            textHTML += "\t\t<td>" + setEvent.data_sub_in + "</td>\n";
            textHTML += "\t\t<td>" + setEvent.data_sub_fn + "</td>\n";
            textHTML += "\t\t<td>" + setEvent.area_conc + "</td>\n";
            textHTML += "\t</tr>\n"

            /* End */
            textHTML += "</table>\n"

            console.log(textHTML);

            response.send(textHTML);

        } else {
            response.send('Event not found.');
        }
    });
});

/* END */


function setNome1(nome) {
    nome_usuario = nome; // nome_usuario foi criada no escopo global
}



// POST
app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;

    if (username && password) {
        connection.query('SELECT * FROM login WHERE usuario = ? AND senha = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                setNome1(username);
                //seta  o user global
                tipo_user_atual = results[0].tipo_user;
                login=results[0].usuario;

                if (results[0].tipo_user == 'aluno') {
                    response.redirect('/homeAluno');
                } else if (results[0].tipo_user == 'professor') {
                    response.redirect('/homeProf');
                } else if (results[0].tipo_user == 'admin') {
                    response.redirect('/homeAdmin');
                }
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

app.post('/cadasA', async function (req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var instituicao = req.body.instituicao;
    var matricula = req.body.matricula;
    var idUser;

    connection.query("INSERT INTO `login` (usuario, senha, tipo_user) VALUES (?,?,?)", [email.toString(), senha.toString(), "aluno"], function (err, result) {
        if (err) throw err;
    });

    connection.query('SELECT idUser FROM login WHERE usuario = ?', [email], function (error, results, fields) {
        if (results.length > 0) {
            idUser = results[0].idUser;
        }
        if (error) throw error;
    });

    await sleep(30);

    connection.query("INSERT INTO `aluno` (nome, email, instituicao,matricula,aLogin) VALUES (?,?,?,?,?)", [nome.toString(), email.toString(), instituicao.toString(), matricula.toString(), idUser.toString()], function (err, result) {
        if (err) throw err;
    });

    res.redirect('/login');
});

app.post('/cadasP', async function (req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var titulacao = req.body.titulacao;
    var instituicao = req.body.instituicao;
    var areadepesquisa = req.body.areadepesquisa;
    var idUser;

    connection.query("INSERT INTO `login` (usuario, senha, tipo_user) VALUES (?,?, ?)", [email.toString(), senha.toString(), "professor"], function (err, result) {
        if (err) throw err;
    });

    connection.query('SELECT idUser FROM login WHERE usuario = ?', [email], function (error, results, fields) {
        if (results.length > 0) {
            idUser = results[0].idUser;
        }
        if (error) throw error;
    });

    await sleep(30);

    connection.query("INSERT INTO `professor` (nome, email,instituicao,titulacao,area_pesq,pLogin) VALUES (?,?,?,?,?,?)", [nome, email, instituicao, titulacao, areadepesquisa, idUser], function (err, result) {
        if (err) throw err;
    });

    res.redirect('/login');
});

app.post('/cadasADM', function (req, res) {
    var nome = req.body.nome;
    var email = req.body.email;

    connection.query("INSERT INTO `admin` (nome, email) VALUES (?,?)", [nome, email], function (err, result) {
        if (err) throw err;
    });

    connection.query("INSERT INTO `login` (usuario, senha, tipo_user) VALUES (?,?, ?)", [email.toString(), senha.toString(), "admin"], function (err, result) {
        if (err) throw err;
    });

    res.redirect('/login');
});

// EDIT

app.post('/editarA', function (req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var instituicao = req.body.instituicao;
    var matricula = req.body.matricula;

    connection.query("UPDATE aluno SET nome = ?, email= ?,instituicao= ?,matricula=? WHERE email = ? ", [nome.toString(), email.toString(), instituicao.toString(), matricula.toString(), nome_usuario.toString()], function (err, result) {
        if (err) throw err;
    });

    connection.query("UPDATE login SET usuario=?, senha=? WHERE usuario = ?", [email.toString(), senha.toString(), nome_usuario.toString()], function (err, result) {
        if (err) throw err;
    });
    res.redirect('/homeAluno');
});

app.post('/editarP', function (req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var titulacao = req.body.titulacao;
    var instituicao = req.body.instituicao;
    var areadepesquisa = req.body.areadepesquisa;

    connection.query("UPDATE professor SET nome = ?, email = ?, titulacao = ?, instituicao = ?, area_pesq = ? WHERE email = ? ", [nome.toString(), email.toString(), titulacao.toString(), instituicao.toString(), areadepesquisa.toString(), nome_usuario.toString()], function (err, result) {
        if (err) throw err;
    });

    connection.query("UPDATE login SET usuario = ?, senha = ? WHERE usuario = ?", [email.toString(), senha.toString(), nome_usuario.toString()], function (err, result) {
        if (err) throw err;
    });
    res.redirect('/homeProf');
});

app.post('/subArtigo', function (req, res) {

    var titulo = req.body.titulo;
    var nome = req.body.nome;
    var email = req.body.email;
    var resumo = req.body.resumo;

    connection.query("INSERT INTO `artigo` (titulo,nome,email,resumo,login) VALUES (?,?,?,?,?)", [titulo, nome, email, resumo,login], function (err, result) {
        if (err) throw err;
    });
    if (tipo_user_atual == "aluno") {
        res.redirect('/homeAluno');
    } else if (tipo_user_atual == "professor") {
        res.redirect('/homeProf');
    }
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

    res.redirect('/homeAdmin');
});

app.post('/verEventos', function (request, response) {
    var textHTML = [""];
    connection.query('SELECT * FROM eventos ORDER BY idEvento DESC LIMIT 5', function (error, results, fields) {

        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {

                var setEvent = require("../../model/eventHomeModel");
                setEvent = setEvent(results[i].nome, results[i].data_sub_in, results[i].data_sub_fn);
                setEvent = JSON.stringify(setEvent);
                setEvent = JSON.parse(setEvent);

                textHTML[0] += "<table>"
                /* Creating table */

                textHTML[0] += "<tr><th>" + "Nome" + "</th>";
                textHTML[0] += "<th>" + "data_sub_in" + "</th>";
                textHTML[0] += "<th>" + "data_sub_fn" + "</th></tr>";

                textHTML[0] += "<tr><td>" + setEvent.nome + "</td>";
                textHTML[0] += "<td>" + setEvent.data_sub_in + "</td>";
                textHTML[0] += "<td>" + setEvent.data_sub_fn + "</td></tr>";
                textHTML[0] += "</table>"

                textHTML[i + 1] += "<table>"
                textHTML[i + 1] += "<tr><td>" + setEvent.nome + "</td>";
                textHTML[i + 1] += "<td>" + setEvent.data_sub_in + "</td>";
                textHTML[i + 1] += "<td>" + setEvent.data_sub_fn + "</td></tr>";
                textHTML[i + 1] += "</table>"

                /* End */


                //console.log(textHTML[0]);
            }

            response.send(textHTML[0]);

        } else {
            response.send('Event not found.');
        }

    });
});


app.post('/verArtigo', function (request, response) {
    var textHTML = [""];
    connection.query('SELECT * FROM artigo WHERE login = ?',[login], function (error, results, fields) {

        if (results.length > 0) {
            for (var i = 0; i < results.length; i++) {


                var setEvent = require("../../model/verArtigoModel");
                setEvent = setEvent(results[i].idArtigo, results[i].titulo, results[i].nome, results[i].email,
                    results[i].resumo, results[i].arquivo, results[i].status);
                setEvent = JSON.stringify(setEvent);
                setEvent = JSON.parse(setEvent);

                textHTML[0] += "<table>"
                /* Creating table */

                textHTML[0] += "<tr><th>" + "idArtigo" + "</th>";
                textHTML[0] += "<th>" + "Titulo" + "</th>";
                textHTML[0] += "<th>" + "Nome" + "</th>";
                textHTML[0] += "<th>" + "Email" + "</th>";
                textHTML[0] += "<th>" + "Resumo" + "</th>";
                textHTML[0] += "<th>" + "Arquivo" + "</th>";
                textHTML[0] += "<th>" + "Status" + "</th></tr>";

                textHTML[0] += "<tr><td>" + setEvent.idArtigo + "</td>";
                textHTML[0] += "<td>" + setEvent.titulo + "</td>";
                textHTML[0] += "<td>" + setEvent.nome + "</td>";
                textHTML[0] += "<td>" + setEvent.email + "</td>";
                textHTML[0] += "<td>" + setEvent.resumo + "</td>";
                textHTML[0] += "<td>" + setEvent.arquivo + "</td>";
                textHTML[0] += "<td>" + setEvent.status + "</td></tr>";
                textHTML[0] += "</table>"
                textHTML[i + 1] += "<table>"
                textHTML[i + 1] += "<tr><td>" + setEvent.idArtigo + "</td>";
                textHTML[i + 1] += "<td>" + setEvent.titulo + "</td>";
                textHTML[i + 1] += "<td>" + setEvent.nome + "</td>";
                textHTML[i + 1] += "<td>" + setEvent.email + "</td>";
                textHTML[i + 1] += "<td>" + setEvent.resumo + "</td>";
                textHTML[i + 1] += "<td>" + setEvent.arquivo + "</td>";
                textHTML[i + 1] += "<td>" + setEvent.status + "</td></tr>";
                textHTML[i + 1] += "</table>"

                /* End */


                //console.log(textHTML[0]);
            }

            response.send(textHTML[0]);

        } else {
            response.send('Event not found.');
        }

    });
});

app.post('/indicarRC', async function (req, res) {

	var idProfessor;
	var nome = req.body.nome;
	var idEvento = req.body.idEvento;
	var emailProfessor = req.body.emailProfessor;
	var erro = 0;
	
	console.log("email do professor: " + emailProfessor);
	
	connection.query('SELECT idprofessor FROM professor WHERE email = ?', [emailProfessor], function (error, results, fields){
		idProfessor = results[0].idprofessor;
		if(error) throw error;
	});

	await sleep(5);
	
	console.log("id do professor: " + idProfessor);

	connection.query('SELECT eventos.nome FROM eventos JOIN revisor_evento ON revisor_evento.rEventos =  eventos.idEvento JOIN professor ON professor.idprofessor = revisor_evento.rProfessor AND professor.idprofessor = ?', [idProfessor], function (error, results, fields){
		if(results.length > 0)				//Regra de negócios é aqui
		{
			if(results.length > 2)
			{
				erro=1;
			}
		}
		
		connection.query("INSERT INTO `revisor_evento` (rProfessor, rEventos) VALUES (?,?)", [idProfessor, idEvento], function (error, results, fields){
			if (error) throw error;
			
		})
		
		if (error) throw error;
	});
	
	await sleep(5);

	if(erro==1)
	{
		res.redirect('/homeAdmin');
	}else
	{
		res.redirect('/indicarRevisorConferencia');
	}
});

app.post('/indicarRA', async function (req, res) {
	var nomeProfessor = req.body.nomeProfessor;
	var emailProfessor = req.body.emailProfessor;
	var nomeArtigo = req.body.nomeArtigo;
	var idArtigo;
	
	connection.query("SELECT idArtigo FROM artigo"{
		
	});
});

//Functions
//Sleep Function
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}


// PORTA
app.listen(8081, function () { console.log("Servidor ligado") });

/* END */