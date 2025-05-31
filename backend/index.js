require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api", [chatRoutes, messageRoutes]);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB ready"))
  .catch((error) => console.error(`MongoDB error: ${error}`));

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
