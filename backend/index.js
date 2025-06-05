require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const autoMessageRoutes = require("./routes/autoMessageRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_HOST,
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/chats", [chatRoutes, messageRoutes, autoMessageRoutes]);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB ready"))
  .catch((error) => console.error(`MongoDB error: ${error}`));

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  const clients = Array.from(io.sockets.sockets.keys());
  console.log("Active clients:", clients.length);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} join chat: ${chatId}`);
  });

  socket.on("leaveChat", (chatId) => {
    socket.leave(chatId);
    console.log(`User ${socket.id} left chat: ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
