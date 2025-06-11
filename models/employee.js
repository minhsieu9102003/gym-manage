const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstname: String,
    lastname: String,
    job: String,
    image: String,
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
});

module.exports = mongoose.model('Employee', EmployeeSchema);
