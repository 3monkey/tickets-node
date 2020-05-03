const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control.js');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // Escuchar ---> cual es el siguiente ticket
    client.on('siguienteTicket',(data, callback)=>{
        let ultimoTicket = ticketControl.siguiente();
        console.log(ultimoTicket);
        callback(ultimoTicket);
        //client.broadcast.emit('siguienteTicket',{ultimo: ticketControl.ultimo});
    });

    // emitir evento 'estadoActual'

    client.emit('estadoActual',{
    		actual: ticketControl.getUltimoTicket(),
            ultimos: ticketControl.getUltimos()
    	}
    );

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                success: false,
                msg: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        client.broadcast.emit('ultimos', {
            ultimos: ticketControl.getUltimos()
        })
        callback(atenderTicket);

    });

});