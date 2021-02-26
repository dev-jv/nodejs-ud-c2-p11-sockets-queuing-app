
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
// console.log(desktop);
lblDesktop.innerText = desktop;
divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => { // "connect" event
    // console.log('Connected > Server');
    btnAttend.disabled = false;
});

socket.on('disconnect', () => { // "disconnect" event
    // console.log('Disconnected > Server');
    btnAttend.disabled = true;
});

socket.on('tickets-pending', (tickets) => {
    if ( tickets === 0 ) {
        divAlert.style.display = '';
        lblPending.innerText = '';
        btnAttend.disabled = true;
    } else {
        divAlert.style.display = 'none';
        btnAttend.disabled = false;
        lblPending.innerText = tickets;
    }
});

btnAttend.addEventListener('click', () => {
    // socket.emit('attend-ticket', desktop, ( ticket ) => {
    socket.emit('attend-ticket', {desktop}, ( {ok, ticket} ) => {
        if(!ok) {
            lblTicket.innerText = '<empty>';
            return divAlert.style.display = '';
        }
        lblTicket.innerText = 'Ticket ' + ticket.number;
    });
});
