import React, { useState, useEffect } from 'react';
import axios from 'axios';

const parseJwt = (token) => {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
};

const ClientChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState(null);
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const senderId = decodedToken?.id;

  // Fetch the vendor (receiverId) from '/api/user/client-list'
useEffect(() => {
  axios.get('http://localhost:4000/api/user/vendors', {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((response) => {
    console.log("Vendors response data:", response.data); // Log the response data to inspect its structure
    const vendors = response.data.vendors; // Access the vendors array
    if (Array.isArray(vendors)) {
      const vendor = vendors.find(user => user.role === "VENDOR");
      if (vendor) {
        setReceiverId(vendor._id);
      } else {
        console.warn("No vendor found.");
      }
    } else {
      console.error("Vendors data is not an array.");
    }
  })
  .catch((error) => console.error("Error fetching vendors:", error));
}, [token]);


  // Fetch messages when receiverId is available
  useEffect(() => {
    if (!senderId || !receiverId) return;

    axios.get(`http://localhost:4000/api/messages/${receiverId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setMessages(res.data))
    .catch(err => console.error(err));
  }, [receiverId, senderId, token]);

  const sendMessage = () => {
    if (!receiverId) {
      console.error("Receiver ID is not available.");
      return;
    }

    axios.post(
      'http://localhost:4000/api/messages/send',
      { receiverId, message: newMessage },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      console.log('Message sent:', response.data);
      setMessages([...messages, response.data]); // Append the new message
      setNewMessage(''); // Clear input field
    })
    .catch(error => console.error('Error:', error.response?.data || error.message));
  };

  return (
    <div>
      <div>
        {messages.map(msg => (
          <div key={msg._id}>{msg.message}</div>
        ))}
      </div>
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={sendMessage} disabled={!receiverId}>Send</button>
    </div>
  );
};

export default ClientChat;
