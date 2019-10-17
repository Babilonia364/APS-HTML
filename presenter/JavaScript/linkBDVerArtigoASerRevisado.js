$(document).ready(function () {
	$.post('/verArtigoASerR', function (res) {
		document.getElementById("output").innerHTML = res;
		// $('span').html(res);
	})
});