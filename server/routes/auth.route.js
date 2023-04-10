const router = require("express").Router();
const AuthController = require("../controllers/auth.controller.js");
const AuthValidation = require("../middleware/auth.validation.js");

router.post("/register", AuthValidation, AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/clearRefreshToken", AuthController.clearRefreshToken);

module.exports = router;
