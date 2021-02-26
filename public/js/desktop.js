
// HTML references
const lblDesktop = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('The desktop is obligatory');
}

const desktop = searchParams.get('desktop');
console.log('desktop: ' + desktop);

lblDesktop.innerText = desktop;

const socket = io();

socket.on('connect', () => { // "connect" event
    // console.log('Connected > Server');
    btnAttend.disabled = false;
});

socket.on('disconnect', () => { // "disconnect" event
    // console.log('Disconnected > Server');
    btnAttend.disabled = true;
});

socket.on('last-ticket', (ticket) => {
    // lblNewTicket.innerText = ticket;
    // console.log('last-ticket'+ ticket)
});

btnAttend.addEventListener('click', () => {
    // socket.emit('next-ticket', null, ( ticket ) => {
    //     lblNewTicket.innerText = ticket;
    //     console.log('From the server: next-ticket', ticket)
    // });
});
