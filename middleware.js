const mongoose = require('mongoose');
const Member = require('./models/member');
const Employee = require('./models/employee');
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Vui lòng đăng nhập');
        return res.redirect('/login');
    }
    next();
};

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect('/');
    }
    next();
};

module.exports.isEmployeeOrAdmin = (req, res, next) => {
    if (!req.isAuthenticated() || (req.user.role !== 'admin' && req.user.role !== 'employee')) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect('/');
    }
    next();
};
module.exports.verifyMemberId = async (req, res, next) => {
    const { memberId } = req.body;

    // Check if the memberId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
        req.flash('error', 'Invalid member ID format');
        return res.redirect('/enroll');
    }

    const member = await Member.findById(memberId);
    if (!member) {
        req.flash('error', 'Invalid member ID');
        return res.redirect('/enroll');
    }
    req.member = member;
    next();
};
module.exports.isEmployeeOrAdmin = (req, res, next) => {
    if (!req.isAuthenticated() || (req.user.role !== 'admin' && req.user.role !== 'employee')) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect('/');
    }
    next();
};

module.exports.verifyEmployeeId = async (req, res, next) => {
    const { employeeId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        req.flash('error', 'Invalid employee ID format');
        return res.redirect('/verifyEmployeeId');
    }

    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            req.flash('error', 'Invalid employee ID');
            return res.redirect('/verifyEmployeeId');
        }
        req.employee = employee;
        next();
    } catch (err) {
        console.error('Error verifying employee ID:', err);
        req.flash('error', 'An error occurred while verifying the employee ID');
        return res.redirect('/verifyEmployeeId');
    }
};