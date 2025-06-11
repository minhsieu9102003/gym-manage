const Member = require('../models/member');
const MemberShip = require('../models/membership');
const Room = require('../models/room');

module.exports.index = async (req, res) => {
    const members = await Member.find({}).populate('membership').populate('room');
    const memberships = await MemberShip.find({});
    const rooms = await Room.find({});
    res.render('members/index', { members, memberships, rooms });
};

module.exports.createMember = async (req, res) => {
    const member = new Member(req.body.member);
    await member.save();
    const room = await Room.findById(req.body.member.room);
    room.members.push(member._id);
    await room.save();
    res.redirect('/members');
};

module.exports.showMember = async (req, res) => {
    const { id } = req.params;
    const memberships = await MemberShip.find({});
    const rooms = await Room.find({});
    const member = await Member.findById(id).populate('membership').populate('room');
    res.render('members/show', { member, memberships, rooms });
};

module.exports.updateMember = async (req, res) => {
    const { id } = req.params;
    const updatedMember = req.body.member;
    const member = await Member.findById(id);
    if (member.room.toString() !== updatedMember.room) {
        // Remove the member from the old room
        await Room.findByIdAndUpdate(member.room, { $pull: { members: member._id } });
        // Add the member to the new room
        const newRoom = await Room.findById(updatedMember.room);
        newRoom.members.push(member._id);
        await newRoom.save();
    }


    await Member.findByIdAndUpdate(id, { ...updatedMember }, { new: true });
    res.redirect(`/members`);
};

module.exports.deleteMember = async (req, res) => {
    const { id } = req.params;
    const member = await Member.findByIdAndDelete(id);
    if (member && member.room) {
        await Room.findByIdAndUpdate(member.room, { $pull: { members: id } });
    }
    if (member && member.membership) {
        await MemberShip.findByIdAndDelete(member.membership);
    }
    res.redirect('/members');
};
