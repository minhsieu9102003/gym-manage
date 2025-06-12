const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberShipSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'Member' },
    tier: String,
    registration_date: String,
    renewal_date: String,
    number_of_sessions: Number,
    remaining_sessions: Number,
    image: String,
});

module.exports = mongoose.model('MemberShip', MemberShipSchema);
