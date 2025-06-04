const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    name: String,
    capacity: Number,
    equipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    image: String,
})

module.exports = mongoose.model('Room', RoomSchema)