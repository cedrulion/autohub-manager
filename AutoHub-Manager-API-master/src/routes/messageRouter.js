import express from 'express';
import { sendMessage, getMessages, getUnreadMessagesCount } from '../controllers/messageController.js';
import checkAuth from '../middleware/CheckAuth.js';

const router = express.Router();


router.post('/send', checkAuth, sendMessage);

router.get('/get-messages', checkAuth, getMessages);

router.get('/unread-count', checkAuth, getUnreadMessagesCount);


export default router;
