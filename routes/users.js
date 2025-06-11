const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
// const catchAsync = require('../utils/catchAsync');
const { storeReturnTo, verifyEmployeeId } = require('../middleware');

router.route('/register')
    .get(users.register)
    .post(users.registerIn);

router.route('/login')
    .get((req, res) => {
        res.render('users/login');
    })
    .post(storeReturnTo, passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), users.handleLogin);

router.get('/logout', users.logout);
router.route('/verifyEmployeeId')
    .get(users.getVerifyEmployeeId)
    .post(verifyEmployeeId, users.postVerifyEmployeeId);

module.exports = router;
