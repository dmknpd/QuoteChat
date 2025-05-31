const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

router.get("/chats", chatController.getAllChats);
router.post("/chats", chatController.createChat);
router.patch("/chats/:id", chatController.updateChat);
router.delete("/chats/:id", chatController.deleteChat);
router.get("/chats/search", chatController.searchChat);

module.exports = router;
