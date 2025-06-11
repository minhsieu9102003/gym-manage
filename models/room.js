 HEAD
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    name: String,
    capacity: Number,
    equipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    image: String,
})


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    name: String,
    capacity: Number,
    equipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    image: String,
})

 0fabf771470e39ededbbfc5013d29df01034c8ea
module.exports = mongoose.model('Room', RoomSchema)