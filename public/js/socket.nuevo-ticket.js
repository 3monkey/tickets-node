
// Comando para establecer la comunicacion
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function(){
	console.log('Conectados al Servidor');
});

socket.on('disconnect', function(){
	console.log('Desconexión del servidor');
});

$('#nuevo-ticket').on('click', function(){
	socket.emit('siguienteTicket', null, function(res){
		label.text(res);
		console.log(res);
	});
});

socket.on('siguienteTicket', function(res){
	console.log(res);
});

socket.on('estadoActual',function(res){
	label.text(res.actual);
});