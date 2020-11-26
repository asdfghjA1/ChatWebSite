const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messgaeContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messgaeContainer.append(messageElement);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
})

const name = prompt("Enter your name");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} - has joined the chat `, 'right')
})
socket.on('recieve', data => {
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} has left the chat`, 'left')
})