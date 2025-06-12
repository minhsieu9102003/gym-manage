const express = require('express');
const router = express.Router();
const members = require('../controllers/members');
const { isLoggedIn, isAdmin } = require('../middleware');

router.route('/')
    .get(isLoggedIn, isAdmin, members.index)
    .post(isLoggedIn, isAdmin, members.createMember);

router.route('/:id')
    .get(isLoggedIn, isAdmin, members.showMember)
    .put(isLoggedIn, isAdmin, members.updateMember)
    .delete(isLoggedIn, isAdmin, members.deleteMember);

module.exports = router;
