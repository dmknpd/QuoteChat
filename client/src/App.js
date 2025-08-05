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
  setSelectedChat,
} from "./store/chatSlice";

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";
const notificationSound = new Audio("/sounds/notification.mp3");

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

    socket.on("newAutoMessage", (message) => {
      const { text, chat } = message;
      const senderFullName = `${chat.firstName} ${chat.lastName}`;

      toast(
        <div className="toast_message">
          <strong className="toast_message__sender">{senderFullName}</strong>
          <span className="toast_message__text">{text}</span>
        </div>,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          className: "custom_toast_container",
          onClick: () => {
            dispatch(setSelectedChat(chat));
          },
        }
      );

      notificationSound.play().catch((e) => {
        console.warn("Failed to play notification sound", e);
      });
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
  }, []);

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
