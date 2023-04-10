const AuthPreventSelfUpdate = (req, res, next) => {
  if (req.user.id === req.params.id) return res.status(401).json({ message: "You cannot do this" });

  next();
};

module.exports = AuthPreventSelfUpdate;
