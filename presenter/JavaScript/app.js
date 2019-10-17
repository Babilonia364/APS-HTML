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

app.get("/editarEvento", function (req, res) {
    res.sendFile(path.resolve("../../view/editarEvento.html"));
});

app.get("/addTag", function (req, res) {
    res.sendFile(path.resolve("../../view/adicionarTag.html"));
});

/* End */


// nome_usuario foi criada no escopo global
function setNome1(nome) {
    nome_usuario = nome;
}

//seta nome do evento global
var nome_event;


/* POST para efetuar uma busca no bd */
app.post('/searchEvent', function (request, response) {
    var nome = request.body.nome;
    nome_event = nome;

    connection.query('SELECT * FROM eventos WHERE nome = ? or sigla  = ? or situacao = ? ', [nome, nome, nome], function (error, results, fields) {
        if (results.length > 0) {
            var textHTML = "";
            var setEvent = require("../../model/eventModel");
            setEvent = setEvent(results[0].nome, results[0].sigla, results[0].data_in, results[0].data_fn,
                results[0].data_sub_in, results[0].data_sub_fn, results[0].area_conc);
            setEvent = JSON.stringify(setEvent);
            setEvent = JSON.parse(setEvent);

            textHTML += "<!DOCTYPE html>";
            textHTML += "<html>";
            textHTML += "<head>"
            textHTML += "<title>Lista Artigos</title>"
            textHTML += "<meta charset=\"utf-8\">"
            textHTML += "<link rel=\"icon\" href=\"resources/imagens/favicon.ico\" type=\"image/x-icon\">"
            textHTML += "<link rel=\"stylesheet\" type='text/css' href=\"view/component/css/styleVerEvento.css\">"
            textHTML += "<script src=\"http://code.jquery.com/jquery-1.11.0.min.js/%22%3E\"</script>"
            textHTML += "<script src=\"../../presenter/JavaScript/linkBDVerArtigo.js\"></script>"
            textHTML += "</head>"
            textHTML += "<body>"
            textHTML += "<div class=\"sidenav\">"
            textHTML += "<img src=\"resources/imagens/icone_artigo.png\" alt=\"Articles Center\">"
            textHTML += "</div>"
            textHTML += "<form action='deletarEvento' method='POST'>"
            textHTML += "<input type='submit' class='sombra' value='Deletar Evento'>"
            textHTML += "</form>"
            textHTML += "<form action='/editarEvento' method='GET'>"
            textHTML += "<input type='submit' class='sombra' value='Editar Evento'>"
            textHTML += "</form>"
            textHTML += "</div>"
            textHTML += "<div class=\"content\">"
            textHTML += "<h1>Evento</h1>"
            textHTML += "</div>"
            textHTML += "<div class=\"content2\">"
            textHTML += "<p id=\"output\"><span></span></p>"
            textHTML += "</div>"

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

            textHTML += "</table>\n"
            textHTML += "</body>\n"
            textHTML += "</html>\n"

            response.send(textHTML);

            /* End */
        } else {
            response.send('Event not found.');
        }
    });
});
/* END */


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
                login = results[0].usuario;

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

app.post('/tonarAdmin', function (req, res) {
    connection.query("UPDATE login SET tipo_user = ? WHERE usuario = ? ", ["admin", nome_usuario.toString()], function (err, result) {
        if (err) throw err;
    });
    res.redirect('/login');
})

app.post('/subArtigo', async function (req, res) {

    var titulo = req.body.titulo;
    var nomeEvento = req.body.eventoNome;
    var nomeAutor = req.body.nome;
    var email = req.body.email;
    var resumo = req.body.resumo;
    var idArtigo;
    var idEvento;
    var erro = 0;

    connection.query("INSERT INTO `artigo` (titulo,nome,email,resumo,status,login) VALUES (?,?,?,?,?,?)", [titulo, nomeAutor, email, resumo, "aguardando revisão", login], function (err, result) {
        if (err) throw err;
    });

    await sleep(5);

    connection.query("SELECT idArtigo FROM artigo WHERE titulo = ?", [titulo], function (err, result) {
        idArtigo = result[0].idArtigo;
        if (err) throw err;
    });

    await sleep(5);

    connection.query("SELECT idEvento FROM eventos WHERE eventos.nome = ?", [nomeEvento], function (error, results, fields) {
        if (results.length > 0) {
            idEvento = results[0].idEvento;
        } else if (error) {
            erro = 1;
        }
    });

    await sleep(5);

    if (erro == 0) {
        connection.query("INSERT INTO artigo_evento (fkArtigo, fkEvento) VALUES (?,?)", [idArtigo, idEvento], function (err, result) {
            if (err) throw err;
        });
    } else if (erro == 1) {
        connection.query("DELETE FROM artigo WHERE idArtigo = ?", [idArtigo], function (err, result) {
            if (err) throw err;
        });
    }

    await sleep(5);

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

app.post('/deletarEvento', function (req, res) {
    connection.query("DELETE FROM `eventos` WHERE nome = ? ", [nome_event], function (err, result) {
        if (err) throw err;
    });

    res.redirect('/homeAdmin');
});

app.post('/editarE', function (req, res) {
    var nome = req.body.nome;
    var sigla = req.body.sigla;
    var data_in = req.body.data_in;
    var data_fn = req.body.data_fn;
    var data_sub_in = req.body.data_sub_in;
    var data_sub_fn = req.body.data_sub_fn;
    var area_conc = req.body.area_conc;
    // var situacao = req.body.situaco;

    connection.query("UPDATE `eventos` SET nome =?, sigla =?, data_in =?, data_fn =?, data_sub_in =?, data_sub_fn =?, area_conc=? WHERE nome = ?", [nome, sigla, data_in, data_fn, data_sub_in, data_sub_fn, area_conc, nome_event], function (err, result) {
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
                textHTML[0] += "<th>" + "Data de inicio das submissões" + "</th>";
                textHTML[0] += "<th>" + "Data de fim das submissões" + "</th></tr>";

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

            }

            response.send(textHTML[0]);

        } else {
            response.send('Event not found.');
        }
    });
});

app.post('/verArtigo', function (request, response) {
    var textHTML = [""];
    connection.query('SELECT * FROM artigo WHERE login = ?', [login], function (error, results, fields) {

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
            }
            response.send(textHTML[0]);
        } else {
            response.send('Você ainda não possui nenhum artigo submetido');
        }
    });
});

app.post('/qtdArtigos', function (request, response) {
    let numArtigos;
    connection.query('SELECT * FROM artigo', function (request, results) {
        numArtigos = results.length;
        response.send(numArtigos.toString());
    });
});

app.post('/qtdArtigosAceitos', function (request, response) {
    let numArtigos;
    connection.query('SELECT * FROM artigo WHERE status = "aceito"', function (request, results) {
        numArtigos = results.length;
        response.send(numArtigos.toString());
    });
});

app.post('/qtdArtigosRejeitados', function (request, response) {
    let numArtigos;
    connection.query('SELECT * FROM artigo WHERE status = "rejeitado"', function (request, results) {
        numArtigos = results.length;
        response.send(numArtigos.toString());
    });
});

app.post('/indicarRC', async function (req, res) {

    var idProfessor;
    var nome = req.body.nome;
    var idEvento = req.body.idEvento;
    var emailProfessor = req.body.emailProfessor;
    var erro = 0;

    connection.query('SELECT idprofessor FROM professor WHERE email = ?', [emailProfessor], function (error, results, fields) {
        idProfessor = results[0].idprofessor;
        if (error) throw error;
    });

    connection.query('SELECT idprofessor FROM professor WHERE email = ?', [emailProfessor], function (error, results, fields) {
        idProfessor = results[0].idprofessor;
        if (error) throw error;
    });

    await sleep(5);

    connection.query('SELECT eventos.nome FROM eventos JOIN revisor_evento ON revisor_evento.rEventos =  eventos.idEvento JOIN professor ON professor.idprofessor = revisor_evento.rProfessor AND professor.idprofessor = ?', [idProfessor], function (error, results, fields) {
        if (results.length > 0)				//Regra de negócios é aqui
        {
            if (results.length > 2) {
                erro = 1;
            }
        }

        connection.query("INSERT INTO `revisor_evento` (rProfessor, rEventos) VALUES (?,?)", [idProfessor, idEvento], function (error, results, fields) {
            if (error) throw error;

        })

        if (error) throw error;
    });

    await sleep(5);

    if (erro == 1) {
        res.redirect('/homeAdmin');
    } else {
        res.redirect('/indicarRevisorConferencia');
    }
});

app.post('/indicarRA', async function (req, res) {
    var nomeProfessor = req.body.nomeProfessor;
    var emailProfessor = req.body.emailProfessor;
    var nomeArtigo = req.body.nomeArtigo;
    var idArtigo;
    var idProfessor;
    var erro = 0;

    connection.query("SELECT idArtigo FROM artigo WHERE titulo = ?", [nomeArtigo], function (error, results, fields) {
        if (results.length > 0) {
            idArtigo = results[0].idArtigo;
        } else {
            erro = 1;
        }

        if (error) throw error;
    });

    await sleep(5);

    if (erro == 0) {
        connection.query("SELECT idprofessor FROM professor WHERE email = ?", [emailProfessor], function (error, results, fields) {
            if (results.length > 0) {
                idProfessor = results[0].idprofessor;
            } else {
                erro = 2;
            }
        });
    }

    await sleep(5);

    if (erro == 0) {
        connection.query("SELECT rProfessor FROM revisor_artigo WHERE rArtigo = ?", [idArtigo], function (error, results, fields) {
            if (results.length > 0) {
                erro = 3;
            }

            if (error) throw error;
        });
    }

    await sleep(5);

    if (erro == 0) {
        connection.query("INSERT INTO `revisor_artigo` (rArtigo, rProfessor) VALUES (?,?)", [idArtigo, idProfessor], function (error, results, fields) {
            if (error) throw error;
        });
    }

    await sleep(5);

    if (erro == 0) {
        res.redirect('/indicarRevisorArtigo')
    } else if (erro == 1) {
        res.send('Article not found.');
    } else if (erro == 2) {
        res.send('Professor not found.');
    } else if (erro == 3) {
        res.send('Article already have a Professor');
    }
});

app.post('/addOneTag', async function (req, res) {
    var nomeEvento = req.body.nomeEvento;
    var tag = req.body.tag;
    var erro = 0;
    var idEvento

    connection.query("SELECT idEvento FROM eventos WHERE nome = ?", [nomeEvento], function (error, results, fields) {
        if (results.length > 0) {
            idEvento = results[0].idEvento;
        } else if (error) {
            erro = 1;
        }
    });

    await sleep(5);

    connection.query("INSERT INTO tag (tag, tEventos) VALUES (?,?)", [tag, idEvento], function (error, results, fields) {
        if (error) throw error;
    });

    await sleep(5);

    if (erro == 0) {
        res.redirect('/addTag')
    } else if (erro == 1) {
        res.send('Event not found.');
    }
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