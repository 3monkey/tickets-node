// Comando para establecer la comunicacion
var socket = io();

socket.on('connect', function(){
	console.log('Conectados al Servidor');
});

socket.on('disconnect', function(){
	console.log('Desconexión del servidor');
});

var searchParams = new URLSearchParams(window.location.search);
//console.log(searchParams.has('escritorio'));
var label = $('#txt-ticket');
if(!searchParams.has('escritorio')){
	window.location = 'index.html';
	throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

//console.log(escritorio);
$('#nescritorio').text('Escritorio ' + escritorio);
$("#btn-atender").on('click', function(){
	socket.emit('atenderTicket',{
		escritorio: escritorio
	}, function(res){
		if(res === 'No hay tickets'){
			alert(res);
			label.text(res);
			return;
		}
		label.text('Ticket ' + res.numero);
		//console.log(res);
	});
});