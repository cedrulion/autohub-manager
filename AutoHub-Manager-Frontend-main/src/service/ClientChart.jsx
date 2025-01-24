import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientChat = ({ clientId, vendorId }) => {
  console.log("Client ID:", clientId);
  console.log("Vendor ID:", vendorId);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!clientId || !vendorId) {
      console.error('Client ID or Vendor ID is missing');
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/messages/getmsg', {
          from: clientId,
          to: vendorId,
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error.response ? error.response.data : error.message);
      }
    };

    fetchMessages();
  }, [clientId, vendorId]);

  const sendMessage = async () => {
    if (!clientId || !vendorId) {
      console.error('Client ID or Vendor ID is missing');
      return;
    }

    try {
      const data = {
        from: clientId,
        to: vendorId,
        message: newMessage,
        senderModel: 'CLIENT', // Ensure senderModel matches the expected value
      };

      console.log("Sending message:", data);

      const response = await axios.post('http://localhost:4000/api/messages/addmsg', data);
      console.log('Message sent successfully:', response.data);
      setNewMessage('');
      // Optionally refetch messages here if you want to update the chat after sending a message
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.fromSelf ? 'from-self' : 'from-other'}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ClientChat;
