 HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberFeedbackSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'Member' },
    content: String,
    create_date: Date,
    image: String,
});

module.exports = mongoose.model('MemberFeedback', MemberFeedbackSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberFeedbackSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'Member' },
    content: String,
    create_date: Date,
    image: String,
});

module.exports = mongoose.model('MemberFeedback', MemberFeedbackSchema);
 0fabf771470e39ededbbfc5013d29df01034c8ea
