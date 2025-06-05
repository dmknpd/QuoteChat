import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import socket from "./socket/socket";
import {
  addChat,
  fetchChats,
  deleteChatFromList,
  updateChatInList,
  updateLastMessage,
} from "./store/chatSlice";

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {
  const dispatch = useDispatch();
  const chatStatus = useSelector((state) => state.chat.status);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    socket.on("newChat", (chat) => {
      dispatch(addChat(chat));
    });

    socket.on("chatUpdated", (chat) => {
      dispatch(updateChatInList(chat));
    });

    socket.on("chatDeleted", (chatId) => {
      dispatch(deleteChatFromList(chatId));
    });

    socket.on("newMessage", (message) => {
      console.log(message);
    });

    socket.on("updateLastMessage", (data) => {
      dispatch(updateLastMessage(data));
    });

    if (chatStatus === "idle") {
      dispatch(fetchChats());
    }

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("newChat");
      socket.off("chatUpdated");
      socket.off("chatDeleted");
      socket.off("updateLastMessage");
    };
  }, [dispatch, chatStatus]);

  return (
    <div className="App">
      <main className="main">
        <Sidebar />
        <ChatWindow />
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
}

export default App;
