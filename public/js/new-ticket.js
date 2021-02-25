
// HTML references
const lblNewTicket  = document.querySelector('#lblNewTicket');
const btnCreate = document.querySelector('button'); // unique button in new-ticket.html

const socket = io();

socket.on('connect', () => { // "connect" event
    // console.log('Connected > Server');
    btnCreate.disabled = false;
});

socket.on('disconnect', () => { // "disconnect" event
    // console.log('Disconnected > Server');
    btnCreate.disabled = true;
});

socket.on('last-ticket', (ticket) => {
    lblNewTicket.innerText = ticket;
    console.log('last-ticket'+ ticket)
});

btnCreate.addEventListener('click', () => {
    socket.emit('next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
        console.log('From the server: next-ticket', ticket)
    });
});
