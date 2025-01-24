import Message from '../models/message.js';


const sendMessage = async (req, res) => {
  const { receiverId, receiverModel, content } = req.body;
  const senderId = req.user._id;
  const senderModel = req.user.role === 'CLIENT' ? 'CLIENT' : 'VENDOR';

  try {
    const message = new Message({
      sender: senderId,
      senderModel,
      receiver: receiverId,
      receiverModel,
      content,
    });

    await message.save();

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

const getMessages = async (req, res) => {
  const userId = req.user._id;
  const userModel = req.user.role === 'CLIENT' ? 'CLIENT' : 'VENDOR';

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, senderModel: userModel },
        { receiver: userId, receiverModel: userModel }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages', error });
  }
};

const getUnreadMessagesCount = async (req, res) => {
  const userId = req.user._id;
  const userModel = req.user.role === 'CLIENT' ? 'CLIENT' : 'VENDOR';

  try {
    const unreadCount = await Message.countDocuments({
      receiver: userId,
      receiverModel: userModel,
      isRead: false,
    });

    res.status(200).json({ unreadCount });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving unread messages count', error });
  }
};

export {
  sendMessage,
  getMessages,
  getUnreadMessagesCount
};
