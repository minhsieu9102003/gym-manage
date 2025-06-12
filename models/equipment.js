const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
    name: String,
    quantity: Number,
    origin: String,
    date_of_arrival: String,
    image: String,
    price: Number,
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
