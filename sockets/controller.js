const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = socketClient => {

    socketClient.emit('last-ticket', ticketControl.last);

    // socketClient.on('disconnect', () => {
    //     console.log('Disconnected client'.brightWhite, socketClient.id);
    // });

    socketClient.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
    });
};

module.exports = {
    socketController
};
