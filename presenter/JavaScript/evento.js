/* Post */
/* Cadastrar evento */
app.post('/cadasE', function (req, res) {
	var tag = req.body.tag;
	var dataInicio = req.body.dataInicio;
	var dataFim = req.body.dataFim;

	connection.query("INSERT INTO `evento` (dataInicio, dataFim,instituicao) VALUES (?,?)", [dataInicio, dataFim], function (err, result) {
		if (err) throw err;
	});

	connection.query("INSERT INTO `tag` (tag) VALUES (?)", [tag], function (err, result) {
		if (err) throw err;
	});

	res.redirect('/login');
});
