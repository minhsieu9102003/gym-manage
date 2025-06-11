const express = require('express');
const router = express.Router();
const Member = require('../models/member');
const { isLoggedIn, verifyMemberId } = require('../middleware');

router.get('/', isLoggedIn, (req, res) => {
    res.render('enroll');
});

router.post('/', isLoggedIn, verifyMemberId, (req, res) => {
    res.redirect(`/enroll/profile/${req.member._id}`);
});
router.get('/profile/:id', isLoggedIn, async (req, res) => {
    const member = await Member.findById(req.params.id).populate('membership room');
    if (!member) {
        req.flash('error', 'Member not found');
        return res.redirect('/enroll');
    }
    res.render('profile', { member });
});

module.exports = router;
