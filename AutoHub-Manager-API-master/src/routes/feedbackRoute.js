const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');


router.post('/feedback', feedbackController.createFeedback);
router.get('/feedback', feedbackController.getFeedbackList);
router.get('/feedback/count', feedbackController.getFeedbackCount);
router.put('/feedback/:id/mark-seen', feedbackController.markFeedbackAsSeen);
router.put('/feedback/:id/mark-unseen', feedbackController.markFeedbackAsUnseen);


module.exports = router;



