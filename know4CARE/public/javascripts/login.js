function login() {

    let input_username = document.getElementById("username").value;
    let input_password = document.getElementById("password").value;

    if (input_username != "" && input_password != "") {

        if (input_username === "admin" && input_password == "admin") {
            alert("Autenticado com sucesso!")
        } else {
            alert("Username ou Password incorretos!")
        }

    } else {
        alert("Preenche os campos por favor!")
    }

}