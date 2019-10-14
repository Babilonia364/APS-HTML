$(document).ready(function () {
	$.post('/searchEvent', function (res) {
		$('span').html(res);
	})
});