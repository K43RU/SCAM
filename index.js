const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log('Server started at http://localhost:' + port);

var app = require('http').createServer(resposta);
app.listen(3000);
console.log("Aplicação está em execução...");
function resposta (req, res) {
     res.writeHead(200);
     res.end("Ola, o servidor esta funcionando corretamente.");
}

var fs = require('fs');

app.listen(3000);
console.log("Aplicação está em execução...");
function resposta (req, res) {
     fs.readFile(__dirname + '/index.html',
     function (err, data) {
         if (err) {
              res.writeHead(500);
              return res.end('Erro ao carregar o arquivo index.html');
         }

         res.writeHead(200);
         res.end(data);
     });
}

var app = require('http').createServer(resposta);
var fs = require('fs');

app.listen(3000);
console.log("Aplicação está em execução...");

function resposta (req, res) {
     var arquivo = "";
     if(req.url == "/"){
         arquivo = __dirname + '/index.html';
     }else{
         arquivo = __dirname + req.url;
     }
     fs.readFile(arquivo,
         function (err, data) {
              if (err) {
                   res.writeHead(404);
                   return res.end('Página ou arquivo não encontrados');
              }

              res.writeHead(200);
              res.end(data);
         }
     );
}

var app = require('http').createServer(resposta);
var fs = require('fs');
var io = require('socket.io')(app);

io.on("connection", function(socket){
  socket.on("enviar mensagem", function(mensagem_enviada, callback){
      mensagem_enviada = "[ " + pegarDataAtual() + " ]: " + mensagem_enviada;

      io.sockets.emit("atualizar mensagens", mensagem_enviada);
      callback();
  });
});
function pegarDataAtual(){
var dataAtual = new Date();
var dia = (dataAtual.getDate()<10 ? '0' : '') + dataAtual.getDate();
var mes = ((dataAtual.getMonth() + 1)<10 ? '0' : '') + (dataAtual.getMonth() + 1);
var ano = dataAtual.getFullYear();
var hora = (dataAtual.getHours()<10 ? '0' : '') + dataAtual.getHours();
var minuto = (dataAtual.getMinutes()<10 ? '0' : '') + dataAtual.getMinutes();
var segundo = (dataAtual.getSeconds()<10 ? '0' : '') + dataAtual.getSeconds();

var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
return dataFormatada;
}

$("form#chat").submit(function(e){
  // Conteúdo da função
});
socket.on("atualizar mensagens", function(mensagem){
var mensagem_formatada = $("<p />").text(mensagem);
  $("#historico_mensagens").append(mensagem_formatada);
});

$("form#login").submit(function(e){
  e.preventDefault();

  socket.emit("entrar", $(this).find("#apelido").val(), function(valido){
      if(valido){
           $("#acesso_usuario").hide();
           $("#sala_chat").show();
      }else{
           $("#acesso_usuario").val("");
           alert("Nome já utilizado nesta sala");
      }
  });
});

var io = require('socket.io')(app);
var usuarios = [];

io.on("connection", function(socket){
socket.on("entrar", function(apelido, callback){
         if(!(apelido in usuarios)){
socket.apelido = apelido;
              usuarios[apelido] = socket;
              callback(true);
         }else{
              callback(false);
         }
     });
     socket.on("enviar mensagem", function(mensagem_enviada, callback){
         mensagem_enviada = "[ " + pegarDataAtual() + " ] " + socket.apelido + " diz: " + mensagem_enviada;
         io.sockets.emit("atualizar mensagens", mensagem_enviada);
         callback();
     });
});

socket.on("entrar", function(apelido, callback){
  if(!(apelido in usuarios)){
      socket.apelido = apelido;
      usuarios[apelido] = socket;

      io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
      io.sockets.emit("atualizar mensagens", "[ " + pegarDataAtual() + " ] " + apelido + " acabou de entrar na sala");

      callback(true);
  }else{
      callback(false);
  }
});

socket.on("atualizar usuarios", function(usuarios){
  $("#lista_usuarios").empty();
  $("#lista_usuarios").append("<option value=''>Todos</option>");
       $.each(usuarios, function(indice){
            var opcao_usuario = $("<option />").text(usuarios[indice]);
            $("#lista_usuarios").append(opcao_usuario);
        });
  });

  io.on("connection", function(socket){
   
 socket.on("disconnect", function(){
   delete usuarios[socket.apelido];
   io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
   io.sockets.emit("atualizar mensagens", "[ " + pegarDataAtual() + " ] " + socket.apelido + " saiu da sala");
 });
});

$("form#chat").submit(function(e){
  e.preventDefault();

  var mensagem = $(this).find("#texto_mensagem").val();
  var usuario = $("#lista_usuarios").val();

  socket.emit("enviar mensagem", {msg: mensagem, usu: usuario}, function(){
      $("form#chat #texto_mensagem").val("");
  });
});

socket.on("enviar mensagem", function(dados, callback){

  var mensagem_enviada = dados.msg;
  var usuario = dados.usu;
   if(usuario == null)
     usuario = '';

     mensagem_enviada = "[ " + pegarDataAtual() + " ] " + socket.apelido + " diz: " + mensagem_enviada;

      if(usuario == ''){
             io.sockets.emit("atualizar mensagens", mensagem_enviada);
      }else{
             socket.emit("atualizar mensagens", mensagem_enviada);
             usuarios[usuario].emit("atualizar mensagens", mensagem_enviada);
      }

      callback();
});