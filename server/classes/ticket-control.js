const fs = require('fs');

class Ticket{
	constructor(numero, escritorio){
		this.numero = numero;
		this.escritorio = escritorio;
	}
}

class TicketControl{
	constructor(){
		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];
		this.ultimos = [];
		let data = require('../data/data.json');

		if(data.hoy === this.hoy){
			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ultimos = data.ultimos;
		}else{
			this.reinciarConteo();
		}
	}

	siguiente(){
		this.ultimo += 1;
		let ticket = new Ticket(this.ultimo, null);
		this.tickets.push(ticket);
		this.grabarArchivo();
		return `Ticket ${this.ultimo}`;
	}

	getUltimoTicket(){
		return `Ticket ${this.ultimo}`;
	}

	getUltimos(){
		return this.ultimos;
	}

	atenderTicket(escritorio){
		if(this.tickets.length === 0){
			return 'No hay tickets';
		}

		let numeroTicket = this.tickets[0].numero;
		this.tickets.shift();

		let atenderTicket = new Ticket(numeroTicket, escritorio);
		this.ultimos.unshift(atenderTicket);
		if(this.ultimos.length > 4){
			this.ultimos.splice(-1,1); // borramos el último elemento.
		}
		//console.log('ultimos - ', this.ultimos);

		this.grabarArchivo();
		return atenderTicket;
	}

	reinciarConteo(){
		this.ultimo = 0;
		this.tickets = [];
		this.ultimos = [];
		/*let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy
		};

		let jsonDataString = JSON.stringify(jsonData);

		fs.writeFileSync('./server/data/data.json', jsonDataString);*/
		this.grabarArchivo();
		return `Ticket ${this.ultimo}`;
	}

	grabarArchivo(){
		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets,
			ultimos: this.ultimos
		};

		let jsonDataString = JSON.stringify(jsonData);

		fs.writeFileSync('./server/data/data.json', jsonDataString);
	}
}

module.exports = {
	TicketControl
}