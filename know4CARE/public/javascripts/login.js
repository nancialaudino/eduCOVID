
async function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username != "" && password != "") {

        try {

            let user = await $.ajax({
                url: "/api/users/login?email="+username+"&contribuinte="+password,
                method: "get",
                dataType: "json"
            });

            alert("autenticado com sucesso!");

        } catch(err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
        }

    } else {
        alert("Preencha os campos!")
    }


}