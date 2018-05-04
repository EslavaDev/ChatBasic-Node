var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));



app.get('/', (req,res)=>{
	 res.status(200).send('hola mundo desde la ruta');
})

var messages = [{
	id:1,
	text:'Bienvenido al chat privado',
	nickname:'Bot   -   EslavaDev'
}]

io.on('connection', (socket)=>{
	console.log("el cliente con IP: "+socket.handshake.address+" se ha conectado...");
	socket.emit('messages',messages);

	socket.on('add-message',(data)=>{
		messages.push(data);

		io.sockets.emit('messages', messages);
	});
});


server.listen(6677, function(){
	console.log('servidor esta en funcionamiento en http://localhost:6677');
});