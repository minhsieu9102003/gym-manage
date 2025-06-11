const Employee = require('../models/employee');
const Room = require('../models/room');

module.exports.index = async (req, res) => {
    const employees = await Employee.find({}).populate('rooms');
    const rooms = await Room.find({});
    res.render('employees/index', { employees, rooms });
};

module.exports.createEmployee = async (req, res) => {
    const employee = new Employee(req.body.employee);
    await employee.save();
    res.redirect('/employees');
};
module.exports.showEmployeeProfile = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id).populate('rooms');
    if (!employee) {
        req.flash('error', 'Employee not found');
        return res.redirect('/');
    }
    res.render('employees/profile', { employee });
};
module.exports.viewRooms = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id).populate({
        path: 'rooms',
        populate: {
            path: 'equipment members'
        }
    });
    if (!employee) {
        req.flash('error', 'Employee not found');
        return res.redirect('/');
    }
    res.render('employees/rooms', { rooms: employee.rooms });
};
module.exports.showEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id).populate('rooms');
    if (!employee) {
        req.flash('error', 'Employee not found');
        return res.redirect('/employees');
    }
    res.render('employees/show', { employee });
};

module.exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    await Employee.findByIdAndUpdate(id, { ...req.body.employee }, { new: true });
    res.redirect(`/employees`);
};

module.exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.redirect('/employees');
};
