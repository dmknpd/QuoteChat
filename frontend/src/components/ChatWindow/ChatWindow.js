import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { fetchMessages, sendNewMessage } from "../../store/messageSlice";

import MessageItem from "../MessageItem/MessageItem";

import styles from "./ChatWindow.module.css";
import user_icon from "../../img/user_icon.svg";

function ChatWindow() {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const messages = useSelector((state) => state.message.messages);
  const messagesStatus = useSelector((state) => state.message.status);
  const [newMessageText, setNewMessageText] = useState("");

  const messagesEndRef = useRef(null);

  const handleFetchMessages = async () => {
    if (selectedChat) {
      try {
        await dispatch(fetchMessages(selectedChat._id)).unwrap();
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Error fetching messages.");
      }
    }
  };

  useEffect(() => {
    if (selectedChat) {
      handleFetchMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {selectedChat && (
          <>
            <img src={user_icon} alt="user_icon" className={styles.user_icon} />
            <h4 className={styles.chat_name}>
              {selectedChat.firstName} {selectedChat.lastName}
            </h4>
          </>
        )}
      </div>
      <ul className={styles.main} ref={messagesEndRef}>
        {!selectedChat ? (
          <div className={styles.select}>Select a chat to start messaging.</div>
        ) : messagesStatus === "loading" ? (
          <div className={styles.select}>
            <div className="loader"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className={styles.select}>No messages in this chat yet.</div>
        ) : (
          messages.map((msg) => <MessageItem key={msg._id} message={msg} />)
        )}
      </ul>
      <div className={styles.footer}>
        {selectedChat && (
          <>
            <button className={styles.send_icon} />
            <input
              className={styles.input}
              type="text"
              placeholder="Type your message"
              disabled={messagesStatus === "loading"}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
