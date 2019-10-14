var evento = {
	idEvento:"",
	nome:"",
	sigla:"",
	data_in:"",
	data_fn:"",
	data_sub_in:"",
	data_sub_fn:"",
	area_conc:"",
};

var setEvent = function (nome, sigla, data_in, data_fn, data_sub_in, data_sub_fn, area_conc)
{
	evento.nome = nome;
	evento.sigla = sigla;
	evento.data_in = data_in;
	evento.data_fn = data_fn;
	evento.data_sub_in = data_sub_in;
	evento.data_sub_fn = data_sub_fn;
	evento.area_conc = area_conc;
	
	return evento;
}

module.exports = setEvent;