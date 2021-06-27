var user = JSON.parse(sessionStorage.getItem("user"));

window.onload = async function () {

    document.getElementById("username").innerHTML = user.nome;
    loadMinhasFormacoes();

    try {

        let formacoes = await $.ajax({
            url: "/api/users/formandos/"+user.id_user+"/formacoes/finalizadas",
            method: "get",
            dataType: "json"
        });

        document.getElementById("acoes_finalizadas").innerHTML = "<span data-purecounter-start='0' data-purecounter-end='"+formacoes.length+"' data-purecounter-duration='2' class='purecounter'>"+formacoes.length+"</span><p>Ações Finalizadas</p>";


    } catch(err) {
        console.log(err);
    }

}

async function chart1(formacoes) {
    
    var lformacoes = [];
    var dformacoes = [];

    for (let i in formacoes) {

        lformacoes.push(formacoes[i].nome);
        dformacoes.push(formacoes[i].conteudosVistos);

    }
    
    var ctx = document.getElementById('myChart1').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            //vai add o nome das formações em que o formando está inscrito
            labels: lformacoes,
            datasets: [{
                label: 'conteúdos vistos',
                data: dformacoes, //vai add o nome número de conteúdos vistos
                backgroundColor: '#22CFCF',
                borderColor: '#22CFCF',
                hoverBackgroundColor: '#22CFCF',
                hoverBorderColor: '#22CFCF'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

function chart2() {

    
    var ctx = document.getElementById('myChart2').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Total de Horas","Quizzes","Tarefas","Multimédia","Alertas"],
            datasets: [{
                label: '# of Votes',
                data: [1,2,3,4,5],
                backgroundColor: [
                    '#22CFCF',
                    '#36A2EB',
                    '#FF6384',
                    '#FF9F40',
                    '#FFCD56'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

}

async function loadMinhasFormacoes() {

    try {

        var formacoes = await $.ajax({
            url: "/api/users/formandos/"+user.id_user+"/formacoes",
            method: "get",
            dataType: "json"
        });

        document.getElementById("acoes_iniciadas").innerHTML = "<span data-purecounter-start='0' data-purecounter-end='"+formacoes.length+"' data-purecounter-duration='2' class='purecounter'>"+formacoes.length+"</span><p>Ações Iniciadas</p>";

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

        chart1(formacoes);
        chart2()

        document.getElementById("minhasFormacoes").innerHTML = html;
        

    } catch(err) {
        console.log(err);
    }


}

function formacaoAbout(id) {
    sessionStorage.setItem("id_acao", id);
	window.location = "modulos.html";    
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
            html += "<p>Objetivo:</p>";
            html += "<p>Horas:</p>";
            html += "<button onclick='abrirConteudo("+conteudo.id_conteudo+");'>Ver</button>";
            html += "</div>";
            html += "</li>";

        }

        document.getElementById("conteudos-lista").innerHTML = html;


    } catch(err) {
        console.log(err);
    }

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

function logout() {
    sessionStorage.clear();
  }