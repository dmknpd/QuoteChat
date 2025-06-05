const express = require("express");
const router = express.Router();

const autoMessageController = require("../controllers/autoMessageController");

router.get("/auto-sender", autoMessageController.getAutoSenderState);
router.post("/auto-sender", autoMessageController.toggleAutoSender);

module.exports = router;
