const socket = io();

document.getElementById('join-user').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        socket.emit('new-user', username);
        document.querySelector('.join-screen').classList.remove('active');
        document.querySelector('.chat-screen').classList.add('active');
    }
});

document.getElementById('send-message').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    if (message) {
        socket.emit('chat-message', message);
        document.getElementById('message-input').value = '';
        addMessage('You', message);
    }
});

socket.on('chat-message', data => {
    addMessage(data.username, data.message);
});

socket.on('user-connected', username => {
    addUpdate(`${username} has joined the conversation`);
});

socket.on('user-disconnected', username => {
    addUpdate(`${username} has left the conversation`);
});

document.getElementById('exit-chat').addEventListener('click', () => {
    socket.disconnect();
    document.querySelector('.join-screen').classList.add('active');
    document.querySelector('.chat-screen').classList.remove('active');
});

function addMessage(username, message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', username === 'You' ? 'my-message' : 'other-message');
    messageContainer.innerHTML = `<div>
                                    <div class="name">${username}</div>
                                    <div class="text">${message}</div>
                                  </div>`;
    document.querySelector('.messages').appendChild(messageContainer);
}

function addUpdate(message) {
    const updateContainer = document.createElement('div');
    updateContainer.classList.add('update');
    updateContainer.textContent = message;
    document.querySelector('.messages').appendChild(updateContainer);
}
