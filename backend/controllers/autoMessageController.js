const axios = require("axios");

const Message = require("../models/message");
const Chat = require("../models/chat");

const getRandomQuote = require("../utils/quoteUtils");

let autoSendInterval = null;

const startAutoSending = async (io) => {
  if (autoSendInterval) return;

  console.log("Starting auto-message sender...");
  autoSendInterval = setInterval(async () => {
    try {
      const chats = await Chat.find().lean();
      if (chats.length === 0) return;

      const randomChat = chats[Math.floor(Math.random() * chats.length)];
      const quote = await getRandomQuote();

      const autoMessage = new Message({
        chatId: randomChat._id,
        sender: "auto",
        text: quote,
      });

      const savedAutoMessage = await autoMessage.save();

      await Chat.findByIdAndUpdate(randomChat._id, { updatedAt: Date.now() });

      io.to(randomChat._id.toString()).emit("newMessage", savedAutoMessage);

      // io.emit("autoMessageNotification", {
      //   chatId: randomChat._id,
      //   chatName: `${randomChat.firstName} ${randomChat.lastName}`,
      //   message: savedAutoMessage,
      // });

      console.log(`Auto-message sent to chat: ${randomChat.firstName}`);
    } catch (error) {
      console.error("Error during auto-sending:", error);
    }
  }, 5000);
};

const stopAutoSending = () => {
  if (autoSendInterval) {
    console.log("Stopping auto-message sender...");
    clearInterval(autoSendInterval);
    autoSendInterval = null;
  }
};

const toggleAutoSender = (req, res) => {
  const { enabled } = req.body;
  const { io } = req;

  if (enabled) {
    startAutoSending(io);
    res.status(200).json({ message: "Auto-sender started" });
  } else {
    stopAutoSending();
    res.status(200).json({ message: "Auto-sender stopped" });
  }
};

module.exports = {
  toggleAutoSender,
};
