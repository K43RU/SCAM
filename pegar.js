var capturando = "";

function capturar(){

  if(capturando != " "){
    console.log("");
    capturando = document.getElementById('valor').value;
    document.getElementById('valor_digitado').innerHTML += capturando + "<br>";

    document.getElementById('valor').value = " ";

  }else{
      alert ("digite algo antes de enviar!");
      document.getElementById('valor_digitado').innerHTML += capturando;
    }
}

const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here

app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use("/admin", admin);

app.use(express.static(join(__dirname, "/")));

app.use((req, res) => {
  res.status(404);
  res.send("404");
});
