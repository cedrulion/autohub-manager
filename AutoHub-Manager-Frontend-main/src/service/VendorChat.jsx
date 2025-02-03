import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa"; // User icon

const VendorChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyTo, setReplyTo] = useState(""); // Reply text

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/messages/vendor/messages",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleReply = async (messageText, replyToMessageId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/messages/reply",
        { message: messageText, replyTo: replyToMessageId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReplyingTo(null); // Reset replyingTo state
      setReplyTo(""); // Clear the reply input
    } catch (error) {
      console.error("Error sending reply:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 space-y-4 bg-gray-50">
      {loading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : (
        messages.map((message) => (
          <div key={message._id} className="message p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-600 text-xl" />
                <span className="font-medium text-gray-800">{message.senderName}</span> {/* Sender's name */}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(message.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700">{message.message}</p>

            {/* Group replies */}
            {message.replyTo && (
              <div className="reply bg-gray-100 p-3 rounded-md mt-3">
                <p className="text-sm text-gray-600">
                  <strong>Replying to:</strong> {message.replyTo.message}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(message.updatedAt).toLocaleString()}
                </span>
              </div>
            )}

            {/* Reply button */}
            <button
              className="text-blue-600 text-sm mt-2"
              onClick={() => setReplyingTo(message._id)}
            >
              Reply
            </button>

            {/* Reply input */}
            {replyingTo === message._id && (
              <div className="reply-input mt-4">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your reply..."
                  value={replyTo}
                  onChange={(e) => setReplyTo(e.target.value)}
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
                  onClick={() => handleReply(replyTo, message._id)}
                >
                  Send Reply
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default VendorChat;
