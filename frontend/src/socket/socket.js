import { io } from "socket.io-client";

const SOCKET_URL = "https://quotechat-e1qu.onrender.com";
const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;
