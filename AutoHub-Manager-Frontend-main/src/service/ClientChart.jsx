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
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  const senderId = decodedToken?.id;

  // Fetch the first available vendor
  useEffect(() => {
    axios.get('http://localhost:4000/api/user/vendors', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log("Vendors response data:", response.data);
      const vendors = response.data.vendors; // Ensure the structure matches
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

  // Fetch all messages related to the current user
  useEffect(() => {
    if (!token) return;
    
    axios.get('http://localhost:4000/api/messages/mychat', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setMessages(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching chat:", error);
      setLoading(false);
    });
  }, [token]);

  const sendMessage = () => {
    if (!receiverId || !newMessage.trim()) {
      console.error("Receiver ID is missing or message is empty.");
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
      setMessages([...messages, response.data]); // Append the new message
      setNewMessage('');
    })
    .catch(error => console.error('Error sending message:', error.response?.data || error.message));
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">My Chat</h2>
      <div className="border p-3 h-64 overflow-y-auto bg-gray-100 rounded-md">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map(msg => (
            <div key={msg._id} className={`p-2 my-2 rounded-lg ${msg.sender === senderId ? 'bg-blue-200 text-right' : 'bg-gray-300'}`}>
              <p className="text-sm">{msg.message}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>
      <div className="mt-3 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l-md"
          placeholder="Type your message..."
        />
        <button 
          onClick={sendMessage} 
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          disabled={!receiverId || !newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ClientChat;
