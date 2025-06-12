const mongoose = require('mongoose');
const Room = require('../models/room');
const Equipment = require('../models/equipment');
const Member = require('../models/member');
const MemberShip = require('../models/membership');
const Employee = require('../models/employee');
const MemberFeedback = require('../models/memberFeedback');

mongoose.connect('mongodb://127.0.0.1:27017/gym');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDB = async () => {
    await Room.deleteMany({});
    await Equipment.deleteMany({});
    await Member.deleteMany({});
    await MemberShip.deleteMany({});
    await Employee.deleteMany({});
    await MemberFeedback.deleteMany({});

    // Add seeding logic here
    // For example:
    const room = new Room({ name: 'Room 1', capacity: 10 });
    await room.save();

    const equipment = new Equipment({ name: 'Treadmill', quantity: 5, origin: 'USA', date_of_arrival: new Date(), price: 1000 });
    await equipment.save();

    room.equipment.push(equipment);
    await room.save();

    const member = new Member({ firstname: 'John', lastname: 'Doe', join_date: new Date(), address1: '123 Main St', address2: '' });
    await member.save();

    const membership = new MemberShip({ member: member._id, tier: 'Gold', registration_date: new Date(), renewal_date: new Date(), number_of_sessions: 10, remaining_sessions: 5 });
    await membership.save();

    member.membership = membership._id;
    await member.save();
};

seedDB().then(() => {
    mongoose.connection.close();
});
