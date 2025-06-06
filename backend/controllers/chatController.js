const chatSchema = require("../validators/chatValidator");
const formatErrors = require("../utils/formatErrors");

const Chat = require("../models/chat");

exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.aggregate([
      {
        $lookup: {
          from: "messages",
          let: { chatId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$chatId", "$$chatId"] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
            { $project: { __v: 0, chatId: 0 } },
          ],
          as: "lastMessage",
        },
      },
      {
        $unwind: {
          path: "$lastMessage",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          lastMessageDate: "$lastMessage.createdAt",
        },
      },
      {
        $sort: {
          lastMessageDate: -1,
        },
      },
      {
        $project: {
          __v: 0,
          lastMessageDate: 0,
        },
      },
    ]);

    res.status(200).json(chats);
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
  const { io } = req;

  if (error) {
    const errors = formatErrors(error);
    return res.status(400).json({ errors });
  }

  try {
    const newChat = new Chat({ firstName, lastName });
    const savedChat = await newChat.save();

    io.emit("newChat", savedChat);

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
  const { io } = req;

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

    io.emit("chatUpdated", updatedChat);

    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteChat = async (req, res) => {
  const { id } = req.params;
  const { io } = req;

  if (!id) {
    return res.status(400).json({ error: "Id param is required" });
  }

  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    await chat.deleteOne();

    io.emit("chatDeleted", id);

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
