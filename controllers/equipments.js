const Equipment = require('../models/equipment');
const Room = require('../models/room');
module.exports.index = async (req, res) => {
    const equipments = await Equipment.find({}).populate('room');
    const rooms = await Room.find({})
    res.render('equipments/index', { equipments, rooms });
};

module.exports.createEquipment = async (req, res) => {

    const equipment = new Equipment(req.body.equipment);
    await equipment.save();

    const room = await Room.findById(req.body.equipment.room);

    room.equipment.push(equipment._id);
    await room.save();

    res.redirect('/equipments');
};

module.exports.showEquipment = async (req, res) => {
    const { id } = req.params;
    const rooms = await Room.find({})
    const equipment = await Equipment.findById(id);
    res.render('equipments/show', { equipment, rooms });
};

module.exports.updateEquipment = async (req, res) => {
    const { id } = req.params;
    const updatedEquipment = req.body.equipment;
    const equipment = await Equipment.findById(id);
    if (equipment.room.toString() !== updatedEquipment.room) {
        // Remove the equipment from the old room
        await Room.findByIdAndUpdate(equipment.room, { $pull: { equipment: equipment._id } });
        // Add the equipment to the new room
        const newRoom = await Room.findById(updatedEquipment.room);
        newRoom.equipment.push(equipment._id);
        await newRoom.save();
    }
    await Equipment.findByIdAndUpdate(id, { ...updatedEquipment }, { new: true });
    res.redirect(`/equipments`);
};

module.exports.deleteEquipment = async (req, res) => {
    const { id } = req.params;
    await Equipment.findByIdAndDelete(id);
    res.redirect('/equipments');
};
