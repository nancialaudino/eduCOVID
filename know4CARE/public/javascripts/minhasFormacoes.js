
var user = JSON.parse(sessionStorage.getItem("user"));
let id_acao = sessionStorage.getItem("id_acao");

console.log(user)

window.onload = function () {

    document.getElementById("username").innerHTML = user.nome;

    minhasFormacoes();

}

async function minhasFormacoes() {

    try {

        let formacoes = await $.ajax({
            url: "/api/users/formandos/"+user.id_user+"/formacoes",
            method: "get",
            dataType: "json"
        });

        let html = "";
        for (let formacao of formacoes) {
            html += "<div class='col mb-4' style='cursor: pointer;' onclick='verFormacao("+formacao.id_acao+")'>";
            html += "<div class='card h-100'>";
            html += "<img src='"+formacao.imagem+"' class='card-img-top'>";
            html += "<div class='card-body'>";
            html += "<h5 class='card-title'>"+formacao.nome+"</h5>";
            html += "<p class='card-text'></p>"
            html += "</div>";
            html += "</div>";
            html += "</div>";
        }

        document.getElementById("listaFormacoes").innerHTML = html;
        

    } catch(err) {
        console.log(err);
    }

}

function verFormacao(id_acao) {
	sessionStorage.setItem("id_acao", id_acao);
	window.location = "modulos.html";
    
}