import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorChat = ({ vendorId }) => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch clients that the vendor has chats with
        axios.get(`http://localhost:4000/api/clients?vendorId=${vendorId}`)
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
            });
    }, [vendorId]);

    useEffect(() => {
        if (selectedClient) {
            axios.get(`http://localhost:4000/api/messages?clientId=${selectedClient}&vendorId=${vendorId}`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [selectedClient, vendorId]);

    const sendMessage = () => {
        axios.post('http://localhost:4000/api/messages', {
            sender: 'VENDOR',
            clientId: selectedClient,
            vendorId,
            message: newMessage,
        })
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <div>
            <div className="client-list">
                {clients.map(client => (
                    <button key={client.id} onClick={() => setSelectedClient(client.id)}>
                        {client.name}
                    </button>
                ))}
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === 'VENDOR' ? 'vendor-message' : 'client-message'}`}>
                        {message.message}
                    </div>
                ))}
            </div>
            {selectedClient && (
                <div className="chat-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default VendorChat;
