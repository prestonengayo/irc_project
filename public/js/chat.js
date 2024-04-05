/* var socket = io('http://localhost:3000');
var channel;
var userId = "<%= userId %>";

// Displaying and hiding the user list depending on whether the type is public or group
function toggleMemberSelect() {
  var typeSelect = document.getElementById('channel-type');
  var memberSelect = document.querySelector('select[name="members"]');
  
  if (typeSelect.value === 'group_message') {
    memberSelect.style.display = 'block';
  } else {
    memberSelect.style.display = 'none';
  }
}
toggleMemberSelect();

// When a channel is selected, load its messages
document.querySelectorAll('.channel-option').forEach(option => {
  option.addEventListener('click', function() {
    const channelId = option.dataset.channelId;
    const channelType = document.getElementById('channel-type').value;

    let members; // Declare the members variable

    fetch(`/channels/${channelId}`)
      .then(response => response.json())
      .then(data => {
        members = data.members; // Assign the retrieved members to the members variable
        
        // Create the channel object within the promise
        channel = {
          channelId: channelId,
          channelType: data.type,
          members: members
        };

        // Use the channel object in your logic
        loadChannelMessages(channelId);
      })
      .catch(error => console.error('Error fetching members:', error));
  });
});

var form = document.getElementById('chat-container');
var messageInput = document.getElementById('message-input');
var messagesContainer = document.getElementById('messages');

// When sending a message, add it to the #messages section and emit it via Socket.IO
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  if (messageInput.value) {
    const date = Date.now();
    const channelId = channel.channelId;
    const members = channel.members;
    const type = channel.channelType;
    
    // Add the channel information to the message
    const messageData = {
      content: messageInput.value,
      user: userId,
      channel: channelId,
      receiverId: members,
      messageType: type,
      createdAt: date,
    };

    const messageId = Date.now();

    addItemToChat(messageInput.value, 'sent', messageId);

    // Emit the event to send the message via Socket.IO
    socket.emit(channel.channelType, messageData);

    messageInput.value = '';
  }
});

// Modification of the addItemToChat function to include the user ID
function addItemToChat(message, className, messageId, senderId) {
    // Ignore adding the message if it comes from the current user but is received as a message from another
    if (className === 'received' && senderId === userId) {
        return;
    }
    var item = document.createElement('p');
    item.textContent = message;
    item.classList.add(className);
    item.setAttribute('data-id', messageId);
    messagesContainer.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

// Modify the Socket.IO listeners to use the modified function and check the user ID
socket.on('public_message', function(data) {
    addItemToChat(data.content, 'received', data.user, data.user);
});

socket.on('group_message', function(data) {
    addItemToChat(data.content, 'received', data.user, data.user);
});

async function loadChannelMessages(channelId) {
    try {
        const response = await fetch(`/chat/messages/${channelId}`); // Make sure you have an appropriate route to retrieve the messages from a specific channel
        const messages = await response.json();

        // Update the display of messages in #messages
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = ''; // Clear previous messages
        
        messages.forEach(message => {
            const item = document.createElement('p');
            item.textContent = message.content;
            
            // Add the 'received' or 'sent' class depending on the user ID or members (recipients)
            if (message.user === userId) {
                addItemToChat(message.content, 'sent', userId);
            } else {
                addItemToChat(message.content, 'received', userId);
            }

            //messagesContainer.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading channel messages:', error);
    }
} */