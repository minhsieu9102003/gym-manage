const express = require('express');
const router = express.Router();
const memberFeedbacks = require('../controllers/memberFeedbacks');
const { isLoggedIn, isAdmin } = require('../middleware');

router.route('/')
    .get(memberFeedbacks.index)
    .post(isLoggedIn, isAdmin, memberFeedbacks.createFeedback);

router.route('/:id')
    .get(memberFeedbacks.showFeedback)
    .put(isLoggedIn, isAdmin, memberFeedbacks.updateFeedback)
    .delete(isLoggedIn, isAdmin, memberFeedbacks.deleteFeedback);

module.exports = router;
