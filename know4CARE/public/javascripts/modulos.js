var user = JSON.parse(sessionStorage.getItem("user"));
var id_acao = sessionStorage.getItem("id_acao");

window.onload = async function () {

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


