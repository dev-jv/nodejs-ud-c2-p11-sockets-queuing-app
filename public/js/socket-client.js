
// HTML references
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend  = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => { // "connect" event
    // console.log('Connected > Server');
    lblOnline.style.display = '';
    lblOffline.style.display = 'none';
});

socket.on('disconnect', () => { // "disconnect" event
    // console.log('Disconnected > Server');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('send-msg', (payload) => {
    console.log(payload)
});

btnSend.addEventListener('click', () => {
    const msg = txtMessage.value;
    // console.log(msg);
    const payload = {
        msg,
        id: '123ABC',
        date: new Date().getTime()
    };

    socket.emit('send-msg', payload, ( kallback ) => {
        console.log('Response from server:', kallback);
    });

});
