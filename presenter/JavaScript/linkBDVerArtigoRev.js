$(document).ready(function () {
	$.post('/verArtigoRev', function (res) {
		document.getElementById("output").innerHTML = res;
		$('span').html(res);
	})
});