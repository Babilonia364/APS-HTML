$(document).ready(function () {
	$.post('/verArtigo', function (res) {
		document.getElementById("output").innerHTML = res;
		$('span').html(res);
	})
});