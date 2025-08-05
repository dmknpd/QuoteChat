import { io } from "socket.io-client";
import { BACKEND_HOST, BACKEND_PORT } from "../config/config";

const SOCKET_URL = `${BACKEND_HOST}:${BACKEND_PORT}`;
const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;
