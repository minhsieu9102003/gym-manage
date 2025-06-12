const express = require('express');
const router = express.Router();
const rooms = require('../controllers/rooms');
const { isLoggedIn, isAdmin } = require('../middleware');

router.route('/')
    .get(isLoggedIn, isAdmin, rooms.index)
    .post(isLoggedIn, isAdmin, rooms.createRoom);

router.route('/:id')
    .get(isLoggedIn, isAdmin, rooms.showRoom)
    .put(isLoggedIn, isAdmin, rooms.updateRoom)
    .delete(isLoggedIn, isAdmin, rooms.deleteRoom);

module.exports = router;
