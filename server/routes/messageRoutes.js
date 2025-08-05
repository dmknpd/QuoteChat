const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

router.get("/:chatId/messages", messageController.getChatMessages);
router.post("/:chatId/messages", messageController.sendMessage);
router.delete("/:chatId/messages", messageController.deleteMessage);

module.exports = router;
