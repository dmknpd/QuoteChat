const axios = require("axios");

const Message = require("../models/message");
const getRandomQuote = require("../utils/quoteUtils");

exports.getChatMessages = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ error: "ChatId param is required" });
  }
  try {
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { text } = req.body;
  const { io } = req;

  if (!chatId) {
    return res.status(400).json({ error: "ChatId param is required" });
  }

  if (!text) {
    return res.status(400).json({ message: "Message text is required" });
  }

  try {
    const userMessage = new Message({
      chatId,
      sender: "user",
      text,
    });

    const savedUserMessage = await userMessage.save();

    io.to(chatId).emit("newMessage", savedUserMessage);

    const chatWithLastMessage = { chatId, lastMessage: savedUserMessage };
    io.emit("updateLastMessage", chatWithLastMessage);

    res.status(200).json(savedUserMessage);

    setTimeout(async () => {
      try {
        const quote = await getRandomQuote();

        const autoMessage = new Message({
          chatId,
          sender: "auto",
          text: quote,
        });

        const savedAutoMessage = await autoMessage.save();

        io.to(chatId).emit("newMessage", savedAutoMessage);

        const chatWithLastMessage = { chatId, lastMessage: savedAutoMessage };
        io.emit("updateLastMessage", chatWithLastMessage);

        console.log(`Auto-response sent to chat ${chatId}`);
      } catch (error) {
        const errorMessage = new Message({
          chatId,
          sender: "auto",
          text: "Sorry, unable to retrieve quote.",
        });
        await errorMessage.save();

        io.to(chatId).emit("newMessage", errorMessage);

        const chatWithLastMessage = { chatId, lastMessage: errorMessage };
        io.emit("updateLastMessage", chatWithLastMessage);

        console.log(`Error response sent to chat ${chatId}`);
      }
    }, 3000);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Id param is required" });
  }

  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await message.deleteOne();

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
