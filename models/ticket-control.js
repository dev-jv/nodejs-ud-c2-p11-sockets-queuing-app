
const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        this.init()
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }
    }

    init() {
        const {last, today, tickets, last4} = require('../db/data.json');
        if (today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.last4 = last4;
        } else {
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    next() {
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveDB();
        return 'Ticket ' + ticket.number;
    }

    attendTicket(desktop) {
        if(this.tickets.length === 0) {
            return null;
        }

        // <> It only returns the first element, therefore it is inadequate.
        // const ticket = this.tickets[0];

        // <> In addition to returning the first element, it extracts it from the array, measuring it!
        const ticket = this.tickets.shift(); // It is an object!..
        ticket.desktop = desktop;

        // <> It is another option?!
        // const ticket = new Ticket(this.tickets.shift().number, desktop);

        // console.log(ticket);
        this.last4.unshift(ticket); // add ticket to beginning
        // console.log(this.last4);
        if(this.last4.length > 4) {
            this.last4.splice(-1, 1); // delete the last
        }
        this.saveDB();
        return ticket;
    }
}

module.exports = TicketControl;
