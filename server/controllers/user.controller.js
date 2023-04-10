const AuthModel = require("../models/auth.model");

exports.getAll = async (req, res) => {
  const users = await AuthModel.find();

  return res.json(users);
};

exports.deleteAll = async (req, res) => {
  await AuthModel.deleteMany();

  return res.json({ message: "success" });
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await AuthModel.findById(id);

    return res.json(user);
  } catch (e) {
    return res.status(404).json({ message: "Undefined user" });
  }
};

exports.getMe = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await AuthModel.findById(id).select(["_id", "username", "hashtag", "role"]);

    return res.json(user);
  } catch (e) {
    return res.status(404).json({ message: "Undefined user" });
  }
};

exports.deleteMe = async (req, res) => {
  const { id } = req.user;

  try {
    await AuthModel.findByIdAndDelete(id);

    return res.json({ message: "User deleted successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateRoleById = async (req, res) => {
  const { id, role } = req.params;

  try {
    await AuthModel.findByIdAndUpdate(id, { role: role });

    return res.json({ message: "Updated successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};
