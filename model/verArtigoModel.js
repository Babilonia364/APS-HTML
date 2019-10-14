var evento = {
	idArtigo:"",
	titulo:"",
	nome:"",
	email:"",
	resumo:"",
	arquivo:"",
	status:"",
	
};

var setEvent = function (idArtigo, titulo, nome, email, resumo, arquivo, status)
{
	evento.idArtigo = idArtigo;
	evento.titulo = titulo;
	evento.nome = nome;
	evento.email = email;
	evento.resumo = resumo;
	evento.arquivo = arquivo;
	evento.status = status;
	
	return evento;
}


module.exports = setEvent;