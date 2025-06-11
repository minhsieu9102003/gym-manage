const express = require('express');
const router = express.Router();
const employees = require('../controllers/employees');
const { isLoggedIn, isAdmin, isEmployeeOrAdmin, verifyEmployeeId } = require('../middleware');

router.route('/')
    .get(isLoggedIn, isAdmin, employees.index)
    .post(isLoggedIn, isAdmin, employees.createEmployee);

router.route('/:id')
    .get(isLoggedIn, isAdmin, employees.showEmployee)
    .put(isLoggedIn, isAdmin, employees.updateEmployee)
    .delete(isLoggedIn, isAdmin, employees.deleteEmployee);

router.route('/profile/:id')
    .get(isLoggedIn, isEmployeeOrAdmin, employees.showEmployeeProfile);

// Route to handle employee ID verification
router.post('/profile', isLoggedIn, verifyEmployeeId, (req, res) => {
    res.redirect(`/employees/profile/${req.employee._id}`);
});

router.route('/:id/rooms')
    .get(isLoggedIn, isEmployeeOrAdmin, employees.viewRooms);

module.exports = router;
