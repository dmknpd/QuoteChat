const chatSchema = require("../validators/chatValidator");
const formatErrors = require("../utils/formatErrors");

const Chat = require("../models/chat");
const Message = require("../models/message");

exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find()
      .sort({ createdAt: 1 })
      .select("-__v")
      .lean();

    const chatsWithLastMessage = await Promise.all(
      chats.map(async (chat) => {
        const lastMessage = await Message.findOne({ chatId: chat._id })
          .sort({ createdAt: -1 })
          .select("-__v -chatId");

        return {
          ...chat,
          lastMessage: lastMessage || null,
        };
      })
    );

    res.status(200).json(chatsWithLastMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createChat = async (req, res) => {
  const { firstName, lastName } = req.body;
  const { error } = chatSchema.validate(
    { firstName, lastName },
    { abortEarly: false }
  );

  if (error) {
    const errors = formatErrors(error);
    return res.status(400).json({ errors });
  }

  try {
    const newChat = new Chat({ firstName, lastName });
    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateChat = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const { error } = chatSchema.validate(
    { firstName, lastName },
    { abortEarly: false }
  );

  if (!id) {
    return res.status(400).json({ error: "Id param is required" });
  }

  if (error) {
    const errors = formatErrors(error);
    return res.status(400).json({ errors });
  }

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
      },
      { new: true, runValidators: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteChat = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ error: "Id param is required" });
  }

  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    await chat.deleteOne();

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
