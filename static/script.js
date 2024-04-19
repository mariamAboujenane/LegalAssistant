function sendMessage() {
    var userMessage = document.getElementById('user-input').value;
    if (userMessage.trim() === '') {
        return;
    }
    appendMessage('user', userMessage);
    document.getElementById('user-input').value = '';

    // Send user message to Flask route
    fetch('/send_message', {
        method: 'POST',
        body: new URLSearchParams({
            'user_message': userMessage
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        var botResponse = data.bot_response;
        appendMessage('bot', botResponse);
    });
}

function appendMessage(sender, message) {
    var chatBox = document.getElementById('chat-box');
    var messageClass = sender === 'user' ? 'user-message' : 'bot-message';
    var messageElement = document.createElement('div');

    if (typeof message === 'object' && 'text' in message) {
        // If the message is an object and has a 'text' property, extract the 'text' property
        message = message.text;
    } else if (typeof message === 'object') {
        // If the message is an object without a 'text' property, convert it to a formatted JSON string
        message = JSON.stringify(message, null, 2);
    }

    messageElement.className = messageClass;
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
