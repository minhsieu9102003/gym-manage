const express = require('express');
const router = express.Router();
const memberships = require('../controllers/memberships');
const { isLoggedIn, isAdmin } = require('../middleware');

router.route('/')
    .get(isLoggedIn, isAdmin, memberships.index)
    .post(isLoggedIn, isAdmin, memberships.createMemberShip);

router.route('/:id')
    .get(isLoggedIn, isAdmin, memberships.showMemberShip)
    .put(isLoggedIn, isAdmin, memberships.updateMemberShip)
    .delete(isLoggedIn, isAdmin, memberships.deleteMemberShip);

module.exports = router;
