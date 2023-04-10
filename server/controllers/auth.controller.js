const AuthModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingEmail = await AuthModel.findOne({ email: email });
    if (existingEmail) return res.status(409).json({ message: "Email already exists" });

    let hashtag = await AuthModel.countDocuments({ username: username });
    hashtag = 9999 - hashtag;

    if (hashtag <= 1) return res.status(409).json({ message: "Username already exists" });

    const newUser = await AuthModel.create({
      username: username,
      hashtag: hashtag,
      email: email,
      role: "default",
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

    return res.json({ message: "Created" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthModel.findOne({ email: email });
    if (!user) return res.status(401).json({ message: "Wrong email or password" });

    if (!(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Wrong email or password" });

    const payload = {
      id: user._id,
      username: user.username,
      hashtag: user.hashtag,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45s" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "6m" });

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    return res.json({ id: payload.id, username: payload.username, hashtag: payload.hashtag, role: payload.role, accessToken: accessToken });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.refresh = (req, res) => {
  const { refreshToken } = req.cookies;

  try {
    if (!refreshToken) return res.status(422).json({ message: "token is required" });

    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!user) return res.status(403).json({ message: "Invalid token" });

    const payload = {
      id: user.id,
      username: user.username,
      hashtag: user.hashtag,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45s" });
    return res.json({ id: payload.id, username: payload.username, hashtag: payload.hashtag, role: payload.role, accessToken: accessToken });
  } catch (e) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

exports.clearRefreshToken = (req, res) => {
  return res.clearCookie("refreshToken").json({ message: "cookie cleared" });
};
