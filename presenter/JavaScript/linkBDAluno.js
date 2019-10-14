$(document).ready(function () {
	$.get('/rows', function (res) {
		$('span').html(res);
	})
});