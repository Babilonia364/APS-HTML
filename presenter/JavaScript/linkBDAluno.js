$(document).ready(function () {
	$.post('/verEventos', function (res) {
		document.getElementById("output").innerHTML = res;
		// $('span').html(res);
	})
});

