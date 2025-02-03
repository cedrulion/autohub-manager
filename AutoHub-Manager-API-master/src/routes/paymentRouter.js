import express from 'express';
const router = express.Router();
import { acceptPayment } from '../controllers/paymentController.js';

router.post('/accept-payment', acceptPayment);

export default router;
