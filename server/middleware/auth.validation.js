const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validation = (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username) return res.status(422).json({ message: "Username is required" });
  if (username.length < 4) return res.status(422).json({ message: "Username must be at least 4 characters" });
  if (username.length > 30) return res.status(422).json({ message: "Username is too long" });

  if (!email) return res.status(422).json({ message: "Email is required" });
  if (!emailRegex.test(email)) return res.status(422).json({ message: "Email is invalid" });

  if (!password) return res.status(422).json({ message: "Password is required" });
  if (password.length < 6) return res.status(422).json({ message: "Password must be at least 6 characters" });
  if (password.length > 40) return res.status(422).json({ message: "Password is too long" });

  if (!confirmPassword) return res.status(422).json({ message: "You must confirm your password" });

  if (password != confirmPassword) return res.status(422).json({ message: "Passwords are not the same" });

  next();
};

module.exports = validation;
