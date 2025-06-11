const User = require('../models/user');
const Employee = require('../models/employee');

module.exports.register = (req, res) => {
    res.render('users/register');
};

module.exports.registerIn = async (req, res, next) => {
    try {
        const { email, username, password, role } = req.body;
        const user = new User({ email, username, role });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, async err => {
            if (err) return next(err);
            if (role === 'employee') {
                const employee = new Employee({ username, firstname: '', lastname: '', job: '', rooms: [] });
                await employee.save();
                req.flash('success', 'Please verify your Employee ID');
                return res.redirect('/verifyEmployeeId');
            }
            req.flash('success', 'Chào mừng bạn');
            res.redirect('/');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.login = async (req, res) => {
    req.flash('success', 'Chào mừng bạn quay trở lại');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;

    // Redirect based on user role
    if (req.user.role === 'admin') {
        return res.redirect('/admin');
    } else if (req.user.role === 'employee') {
        const employee = await Employee.findOne({ username: req.user.username }).populate('rooms');
        if (!employee) {
            req.flash('error', 'Employee profile not found');
            return res.redirect('/');
        }
        return res.redirect(`/employees/profile/${employee._id}`);
    } else {
        res.redirect(redirectUrl);
    }
};
module.exports.handleLogin = async (req, res) => {
    const { role } = req.body;
    req.flash('success', 'Chào mừng bạn quay trở lại');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;

    if (role === 'employee') {
        const employee = await Employee.findOne({ username: req.user.username });
        if (!employee) {
            req.flash('error', 'Employee profile not found');
            return res.redirect('/verifyEmployeeId');
        }
        return res.redirect(`/verifyEmployeeId`);
    } else {
        if (req.user.role === 'admin') {
            return res.redirect('/admin');
        }
        res.redirect(redirectUrl);
    }
};

module.exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Đăng xuất thành công');
        res.redirect('/');
    });
};

module.exports.getVerifyEmployeeId = (req, res) => {
    res.render('users/verifyEmployeeId');
};

module.exports.postVerifyEmployeeId = async (req, res) => {
    console.log(req.body)
    const { employeeId } = req.body;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
        req.flash('error', 'Invalid Employee ID');
        return res.redirect('/verifyEmployeeId');
    }

    req.flash('success', 'Employee verified successfully');
    res.redirect(`/employees/profile/${employee._id}`);
};