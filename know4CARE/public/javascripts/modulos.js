var user = JSON.parse(sessionStorage.getItem("user"));
var id_acao = sessionStorage.getItem("id_acao");

window.onload = async function () {

    loadMinhasFormacoes();

    document.getElementById("username").innerHTML = user.nome;

    try {

        let formacao = await $.ajax({
            url: "/api/formacoes/formacao/"+id_acao,
            method: "get",
            dataType: "json"
        });
        
        document.getElementById("titulo").innerHTML = formacao.nome;
        document.getElementById("descricao").innerHTML = formacao.descricao;

        let html = "";
        for (let modulo of formacao.modulos) {
            html += "<li data-aos='fade-up'>";
            html += "<i fas fa-check-circle'></i> <a data-bs-toggle='collapse' class='collapse' data-bs-target='#faq-list-"+modulo.id_modulo+"'>Módulo "+modulo.id_modulo+ " - "+ modulo.nome+"<i class='bx bx-chevron-down icon-show'></i><i class='bx bx-chevron-up icon-close'></i></a>";
            html += "<div id='faq-list-"+modulo.id_modulo+"' class='collapse show' data-bs-parent='.faq-list'>";
            html += "<p>Módulo Obrigatório</p>";
            html += "<p>Duração Total:"+modulo.duracao+"</p>";
            html += "<p>Objetivo: "+modulo.descricao+"</p>";
            html += "</div>";
            html += "</li>";
        }
        document.getElementById("modulos").innerHTML = html;

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

            if (formacao.id_acao == id_acao) {
                document.getElementById("btn-iniciar").style.display = "none";
                console.log(id_acao);
            }
            
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
                    html += "<li style='margin: 0; padding: 0; margin-left: 10px;'>Conteudo</li>";
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

async function iniciarFormacao() { 

    let data = {
        id_formando: user.id_user
    }

    try {

        let result = await $.ajax({
            url: "/api/formacoes/"+id_acao+"/participar",
            method: "post",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json"
        });

        alert("participar na formação!");
        //window.location = "moduloFormacao.html";   
        
    } catch(err) {
        console.log(err);
    }

}