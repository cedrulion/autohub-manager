const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/accept-payment', paymentController.acceptPayment);

module.exports = router;
