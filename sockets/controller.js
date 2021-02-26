const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = socketClient => {
    // console.log(ticketControl);
    socketClient.emit('last-ticket', ticketControl.last);

    // socketClient.on('disconnect', () => {
    //     console.log('Disconnected client'.brightWhite, socketClient.id);
    // });

    socketClient.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
    });

    // socketClient.on('attend-ticket', (desktop, callback) => {
    socketClient.on('attend-ticket', ({desktop}, callback) => {
        // console.log(desktop);
        // console.log({desktop});
        if(!desktop) {
            return callback({
                ok: false,
                msg: 'The desktop is obligatory!'
            });
        }

        const ticket = ticketControl.attendTicket(desktop);

        if(!ticket) {
            return callback({
                ok: false,
                msg: 'There are no more tickets pending!'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });
};

module.exports = {
    socketController
};
