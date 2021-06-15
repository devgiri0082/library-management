const IssueModel = require("../models/issueMode");
let Member = require("../models/memberModel");
let showAllMember = async () => {
  try {
    let allMember = await Member.find();
    if (allMember.length === 0) {
      console.log("No member to show");
      return;
    }
    allMember.forEach((elem) =>
      console.log(`MemberName: ${elem.name}, MemberId: ${elem.memberId}`)
    );
  } catch (err) {
    console.log(err);
  }
};
let addNewMember = async (name) => {
  try {
    let newMember = new Member({ name: name });
    await newMember.save();
    console.log(
      `${name} is added as a member of with MemberId ${newMember.memberId}`
    );
  } catch (err) {
    console.log(err);
  }
};

let deleteMember = async (id) => {
  try {
    let givenMember = await Member.findOne({ memberId: id });
    if (!givenMember) {
      console.log("Given member does not exist");
      return;
    }
    let memberIssue = await IssueModel.findOne({
      issuingMember: givenMember["_id"],
    });
    console.log(memberIssue);
    if (memberIssue && memberIssue["isIssued"]) {
      await memberIssue.updateOne({ isIssued: false });
    }
    let name = givenMember.name;
    await givenMember.deleteOne();
    console.log(
      `${name} with memberId ${id} has been removed from our system successfully`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { showAllMember, addNewMember, deleteMember };
