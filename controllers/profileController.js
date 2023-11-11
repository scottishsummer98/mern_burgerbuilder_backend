const _ = require("lodash");
const { Profile, validate } = require("../models/profile");
const formidable = require("formidable");

module.exports.addUserDetails = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).send("Something went wrong!");
    for (key in fields) {
      fields[key] = fields[key][0];
    }
    const { error } = validate(
      _.pick(fields, [
        "phone",
        "address1",
        "address2",
        "city",
        "state",
        "postcode",
        "country",
      ])
    );
    if (error) return res.status(400).send(error.details[0].message);
    const profile = new Profile(fields);
    profile.user = req.user._id;
    try {
      const result = await profile.save();
      return res.status(201).send({
        message: "Profile Information created successfully!",
        data: _.pick(result, [
          "user",
          "phone",
          "address1",
          "address2",
          "city",
          "state",
          "postcode",
          "country",
        ]),
      });
    } catch (e) {
      return res.status(500).send("Internal Server error");
    }
  });
};
module.exports.getUserDetails = async (req, res) => {
  const profile = await Profile.findOne({
    user: req.user._id,
  }).populate("user", "name");
  return res.status(200).send(profile);
};
module.exports.updateUserDetailsById = async (req, res) => {
  const userId = req.params.id;
  const userProfile = await Profile.findById(userId);
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    if (err) return res.status(400).send("Something went wrong!");
    for (key in fields) {
      fields[key] = fields[key][0];
    }
    const updatedFields = _.pick(fields, [
      "phone",
      "address1",
      "address2",
      "city",
      "state",
      "postcode",
      "country",
    ]);
    _.assignIn(userProfile, updatedFields);

    try {
      const result = await userProfile.save();
      return res.status(201).send({
        message: "Profile Information updated successfully!",
        data: _.pick(result, [
          "_id",
          "phone",
          "address1",
          "address2",
          "city",
          "state",
          "postcode",
          "country",
        ]),
      });
    } catch (e) {
      return res.status(500).send("Internal Server error");
    }
  });
};
