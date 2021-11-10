var capturando = "";

function capturar(){

    console.log("");
    capturando = document.getElementById('valor').value;
    document.getElementById('valor_digitado').innerHTML += capturando + "<br>";

    document.getElementById('valor').value = " ";

    while(capturando == null){
        alert ("digite algo antes de enviar!");
        return true;
    }
}

const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here

app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use("/admin", admin);

app.use(express.static(join(__dirname, "/public")));

app.use((req, res) => {
  res.status(404);
  res.send("404");
});
