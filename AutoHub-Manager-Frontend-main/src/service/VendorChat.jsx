import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaCommentSlash, FaReply, FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendorChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        "http://localhost:4000/api/messages/vendor/messages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setMessages(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(error.response?.data?.message || error.message);
      toast.error("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (messageText, replyToMessageId) => {
    if (!messageText.trim()) {
      toast.warning("Reply cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/api/messages/reply",
        { 
          message: messageText, 
          replyTo: replyToMessageId 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optimistically update UI
      toast.success("Reply sent successfully");
      setReplyingTo(null);
      setReplyText("");
      
      // Refetch messages to ensure consistency
      fetchMessages();
    } catch (error) {
      console.error("Error sending reply:", error.response?.data || error.message);
      toast.error("Failed to send reply. Please try again.");
    }
  };

  const renderMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg">
      <FaCommentSlash className="text-6xl text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-600 mb-2">
        No Messages Yet
      </h2>
      <p className="text-gray-500 text-center">
        When you receive messages, they will appear here.
      </p>
    </div>
  );

  const MessageCard = ({ message }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <FaUser className="text-blue-500 text-2xl" />
          <div>
            <h3 className="font-semibold text-gray-800">{message.senderName}</h3>
            <span className="text-xs text-gray-500">
              {renderMessageTime(message.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-3">{message.message}</p>

      {message.replyTo && (
        <div className="bg-gray-100 rounded-md p-3 mb-3">
          <p className="text-sm text-gray-600 italic">
            <strong>In reply to:</strong> {message.replyTo.message}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={() => setReplyingTo(message._id)}
          className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 text-sm"
        >
          <FaReply /> <span>Reply</span>
        </button>
      </div>

      {replyingTo === message._id && (
        <div className="mt-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleReply(replyText, message._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center space-x-2"
            >
              <FaPaperPlane /> <span>Send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer position="top-right" />
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Vendor Messages</h1>
      
      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          {messages.map((message) => (
            <MessageCard key={message._id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorChat;