const MemberFeedback = require('../models/memberFeedback');
const Member = require('../models/member');

module.exports.index = async (req, res) => {
    const feedbacks = await MemberFeedback.find({}).populate('member');
    const members = await Member.find({});
    res.render('memberFeedbacks/index', { feedbacks, members });
};

module.exports.createFeedback = async (req, res) => {
    const feedback = new MemberFeedback(req.body.feedback);
    await feedback.save();
    res.redirect('/memberFeedbacks');
};

module.exports.showFeedback = async (req, res) => {
    const { id } = req.params;
    const feedback = await MemberFeedback.findById(id).populate('member');
    const members = await Member.find({});
    res.render('memberFeedbacks/show', { feedback, members });
};

module.exports.updateFeedback = async (req, res) => {
    const { id } = req.params;
    const feedback = await MemberFeedback.findByIdAndUpdate(id, { ...req.body.feedback }, { new: true }).populate('member');
    res.redirect(`/memberFeedbacks/${feedback._id}`);
};

module.exports.deleteFeedback = async (req, res) => {
    const { id } = req.params;
    await MemberFeedback.findByIdAndDelete(id);
    res.redirect('/memberFeedbacks');
};
