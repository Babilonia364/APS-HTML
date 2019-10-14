$(document).ready(function () {
	$.post('/searchEvent', function (res) {
		document.getElementById("output").innerHTML = res;
		$('span').html(res);
	})
});