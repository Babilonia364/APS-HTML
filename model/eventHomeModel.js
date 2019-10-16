var evento = {
	nome:"",
	data_sub_in:"",
	data_sub_fn:"",
};

var setEvent = function (nome, data_sub_in, data_sub_fn)
{
	evento.nome = nome;
	evento.data_sub_in = data_sub_in;
	evento.data_sub_fn = data_sub_fn;
	
	return evento;
}

module.exports = setEvent;