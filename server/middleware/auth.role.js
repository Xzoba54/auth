const authRole = (permissions) => {
  return (req, res, next) => {
    const result = permissions.some((permission) => req.user.role === permission);

    if (!result) return res.status(403).json({ message: "No permissions" });

    next();
  };
};

module.exports = authRole;
