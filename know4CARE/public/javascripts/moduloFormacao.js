var user = JSON.parse(sessionStorage.getItem("user"));
var id_acao = sessionStorage.getItem("id_acao");
var id_conteudo = sessionStorage.getItem("id_conteudo");

window.onload = async function () {

    loadMinhasFormacoes();

    document.getElementById("username").innerHTML = user.nome;

    try {

        let conteudo = await $.ajax({
            url: "/api/conteudos/"+id_conteudo,
            method: "get",
            dataType: "json"
        });
        
        document.getElementById("titulo").innerHTML = "Módulo " + conteudo.modulo_id + " - " + conteudo.titulo;
        document.getElementById("descricao").innerHTML = conteudo.texto;
        document.getElementById("video").href = conteudo.linkVideo;
        

    } catch(err) {
        console.log(err);
    }

}

async function loadMinhasFormacoes() {

    try {

        let formacoes = await $.ajax({
            url: "/api/users/formandos/"+user.id_user+"/formacoes",
            method: "get",
            dataType: "json"
        });

        let html = "";
        for (let formacao of formacoes) {
            html += "<details>";
            html += "<summary style='color: #124265'><span onclick='formacaoAbout("+formacao.id_acao+");'>"+formacao.nome+"</span></summary>";

            try {

                let formacaoInfo = await $.ajax({
                    url: "/api/formacoes/formacao/"+formacao.id_acao,
                    method: "get",
                    dataType: "json"
                });
        
                for (let modulo of formacaoInfo.modulos) {


                    html += "<details style='margin: 0; padding: 0; margin-left: 10px;'>";
                    html += "<summary style='color: #124265'>"+modulo.nome+"</summary>";
                    html += "<ul>";
                    html += "<li style='margin: 0; padding: 0; margin-left: 10px;'>Objetivo</li>";
                    html += "<li onclick='loadConteudos("+modulo.modulo_id+");' style='margin: 0; padding: 0; margin-left: 10px; cursor: pointer;'>Conteudos</li>";
                    html += "<li style='margin: 0; padding: 0; margin-left: 10px;'><a href='quiz.html'>Quiz</a></li>";
                    html += "</ul>";
                    html += "</details>";

                }
        
        
            } catch(err) {
                console.log(err);
            }
            html += "</details>";
            html += "</details>";
        }

        document.getElementById("minhasFormacoes").innerHTML = html;
        

    } catch(err) {
        console.log(err);
    }


}

function formacaoAbout(id) {
    sessionStorage.setItem("id_acao", id);
	window.location = "modulos.html";    
}

async function abrirConteudo(id) {

    let data = {
        id_utilizador: user.id_user
    }

    try {

        let formando = await $.ajax({
            url: "/api/conteudos/"+id+"/visto",
            method: "post",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json"
        });


    } catch(err) {
        console.log(err);
    }

    sessionStorage.setItem("id_conteudo", id);
    window.location = "moduloFormacao.html";

}

async function loadConteudos(id) {

    document.getElementById("conteudos").style.display = "block";
    document.getElementById("dashboard").style.display = "none";

    try {

        let conteudos = await $.ajax({
            url: "/api/formacoes/modulo/"+id+"/conteudos",
            method: "get",
            dataType: "json"
        });

        let html = "";
        for (let conteudo of conteudos) {

            html += "<li data-aos='fade-up'>";
            html += "<i fas fa-check-circle'></i> <a data-bs-toggle='collapse' class='collapse' data-bs-target='#faq-list-"+conteudo.id_conteudo+"'>Módulo "+conteudo.modulo_id+ " - "+ conteudo.titulo+"<i class='bx bx-chevron-down icon-show'></i><i class='bx bx-chevron-up icon-close'></i></a>";
            html += "<div id='faq-list-"+conteudo.id_conteudo+"' class='collapse show' data-bs-parent='.faq-list'>";
            html += "<button onclick='abrirConteudo("+conteudo.id_conteudo+");'>Ver</button>";
            html += "</div>";
            html += "</li>";

        }

        document.getElementById("conteudos-lista").innerHTML = html;


    } catch(err) {
        console.log(err);
    }

}