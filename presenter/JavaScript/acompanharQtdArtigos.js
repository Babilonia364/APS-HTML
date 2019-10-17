$(document).ready(function () {
  $.post('/qtdArtigos', function (res) {
    document.getElementById("artigos-submetidos").innerHTML = res;
  })
});

$(document).ready(function () {
  $.post('/qtdArtigosAceitos', function (res) {
    document.getElementById("artigos-aceitos").innerHTML = res;
  })
});

$(document).ready(function () {
  $.post('/qtdArtigosRejeitados', function (res) {
    document.getElementById("artigos-rejeitados").innerHTML = res;
  })
});