const express = require("express");
const router = express.Router();

const autoMessageController = require("../controllers/autoMessageController");

router.post("/auto-messages", autoMessageController.toggleAutoSender);

module.exports = router;
