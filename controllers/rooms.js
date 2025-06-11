const Room = require('../models/room');

module.exports.index = async (req, res) => {
    const rooms = await Room.find({}).populate('equipment members');
    res.render('rooms/index', { rooms });
};

module.exports.createRoom = async (req, res) => {
    const room = new Room(req.body.room);
    await room.save();
    res.redirect('/rooms');
};

module.exports.showRoom = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id).populate('equipment members');
    res.render('rooms/show', { room });
};

module.exports.updateRoom = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findByIdAndUpdate(id, { ...req.body.room }, { new: true });
    res.redirect(`/rooms`);
};

module.exports.deleteRoom = async (req, res) => {
    const { id } = req.params;
    await Room.findByIdAndDelete(id);
    res.redirect('/rooms');
};
