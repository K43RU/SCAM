var capturando = "";

function capturar(){
    console.log("");
    capturando = document.getElementById('valor').value;
    document.getElementById('valor_digitado').innerHTML += capturando + "<br>";
}