const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = socketClient => {

    socketClient.on('disconnect', () => {
        console.log('Disconnected client'.brightWhite, socketClient.id);
    });

    socketClient.on('send-msg', (payload, callback) => {
        const id = 123456;
        callback({id: id, mss: "DB response"});
        socketClient.broadcast.emit('send-msg', payload);
    });
};

module.exports = {
    socketController
};
