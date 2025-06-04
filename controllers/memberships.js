const MemberShip = require('../models/membership');
const Member = require('../models/member');

module.exports.index = async (req, res) => {
    const memberships = await MemberShip.find({}).populate('member');
    const members = await Member.find({});
    res.render('memberships/index', { memberships, members });
};

module.exports.createMemberShip = async (req, res) => {
    const { member, tier, registration_date, renewal_date, number_of_sessions, remaining_sessions } = req.body.membership;

    // Create a new membership
    const membership = new MemberShip({
        member,
        tier,
        registration_date,
        renewal_date,
        number_of_sessions,
        remaining_sessions
    });

    await membership.save();

    // Find the corresponding member and update their membership attribute
    const relatedMember = await Member.findById(member);
    relatedMember.membership = membership._id;
    await relatedMember.save();

    res.redirect('/memberships');

};

module.exports.showMemberShip = async (req, res) => {
    const { id } = req.params;
    const members = await Member.find({});
    const membership = await MemberShip.findById(id).populate('member');
    res.render('memberships/show', { membership, members });
};

module.exports.updateMemberShip = async (req, res) => {
    const { id } = req.params;
    const { member, tier, registration_date, renewal_date, number_of_sessions, remaining_sessions } = req.body.membership;

    // Find the existing membership
    const existingMembership = await MemberShip.findById(id);

    // Update the membership details
    const updatedMembership = await MemberShip.findByIdAndUpdate(id, {
        member,
        tier,
        registration_date,
        renewal_date,
        number_of_sessions,
        remaining_sessions
    }, { new: true });

    // If the member has changed, update the old member's membership attribute
    if (existingMembership.member.toString() !== member) {
        const oldMember = await Member.findById(existingMembership.member);
        if (oldMember) {
            oldMember.membership = null;
            await oldMember.save();
        }
    }

    // Update the new member's membership attribute
    const newMember = await Member.findById(member);
    if (newMember) {
        newMember.membership = updatedMembership._id;
        await newMember.save();
    }

    res.redirect(`/memberships`);
};

module.exports.deleteMemberShip = async (req, res) => {
    const { id } = req.params;
    await MemberShip.findByIdAndDelete(id);
    res.redirect('/memberships');
};
