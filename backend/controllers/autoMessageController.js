const Message = require("../models/message");
const Chat = require("../models/chat");

const getRandomQuote = require("../utils/quoteUtils");

let autoSendInterval = null;
let isAutoSendingEnabled = false;

const startAutoSending = async (io) => {
  if (autoSendInterval) return;

  console.log("Starting auto-message sender...");
  isAutoSendingEnabled = true;

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
      io.emit("newAutoMessage", {
        ...savedAutoMessage.toObject(),
        chat: randomChat,
      });

      console.log(
        `Auto-message sent to chat: ${randomChat.firstName} ${randomChat.lastName}`
      );
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

  isAutoSendingEnabled = false;
};

const toggleAutoSender = (req, res) => {
  const { enabled } = req.body;
  const { io } = req;

  if (enabled) {
    startAutoSending(io);
  } else {
    stopAutoSending();
  }

  res.status(200).json({ enabled: isAutoSendingEnabled });
};

const getAutoSenderState = (req, res) => {
  res.status(200).json({ enabled: isAutoSendingEnabled });
};

module.exports = {
  toggleAutoSender,
  getAutoSenderState,
};
