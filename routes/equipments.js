const express = require('express');
const router = express.Router();
const equipments = require('../controllers/equipments');
const { isLoggedIn, isAdmin } = require('../middleware');

router.route('/')
    .get(isLoggedIn, isAdmin, equipments.index)
    .post(isLoggedIn, isAdmin, equipments.createEquipment);

router.route('/:id')
    .get(isLoggedIn, isAdmin, equipments.showEquipment)
    .put(isLoggedIn, isAdmin, equipments.updateEquipment)
    .delete(isLoggedIn, isAdmin, equipments.deleteEquipment);

module.exports = router;
