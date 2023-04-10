const router = require("express").Router();
const UserController = require("../controllers/user.controller");

const authToken = require("../middleware/auth.token");
const authRole = require("../middleware/auth.role");
const AuthPreventSelfUpdate = require("../middleware/auth.preventSelfUpdate");

const roles = require("../helpers/roles");

router.get("/all", authToken, authRole([roles.editor, roles.admin]), UserController.getAll);
router.delete("/all", UserController.deleteAll);
router.get("/me", authToken, UserController.getMe);
router.delete("/me", authToken, UserController.deleteMe);
router.put("/:id/:role", authToken, authRole([roles.editor, roles.admin]), AuthPreventSelfUpdate, UserController.updateRoleById);
router.get("/:id", authToken, UserController.getById);

module.exports = router;
