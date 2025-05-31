require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api", [chatRoutes, messageRoutes]);
