
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

socket.on('last-ticket', (last) => {
    lblNewTicket.innerText = last;
    // console.log('last-ticket: ' + last)
});

btnCreate.addEventListener('click', () => {
    socket.emit('next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
        // console.log('next-ticket: ', ticket);
    });
});
