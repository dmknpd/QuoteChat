import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { fetchMessages, sendNewMessage } from "../../store/messageSlice";
import { addMessage } from "../../store/messageSlice";
import socket from "../../socket/socket";

import MessageItem from "../MessageItem/MessageItem";
import ChatModal from "../ChatModal/ChatModal";

import styles from "./ChatWindow.module.css";
import user_icon from "../../img/user_icon.svg";

function ChatWindow() {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const messages = useSelector((state) => state.message.messages);
  const messagesStatus = useSelector((state) => state.message.status);
  const [newMessageText, setNewMessageText] = useState("");
  const [isEditModalOpen, setIsEdiModalOpen] = useState(false);

  const handleEditModalOpen = (event) => {
    event.preventDefault();
    setIsEdiModalOpen(true);
  };

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

  const handleSendMessage = async () => {
    if (!newMessageText.trim() || !selectedChat) {
      return;
    }

    try {
      await dispatch(
        sendNewMessage({
          chatId: selectedChat._id,
          messageText: { text: newMessageText },
        })
      ).unwrap();
      setNewMessageText("");
      toast.success("Message sent.");
    } catch (error) {
      console.error("Error sending message", error);
      toast.error("Error sending message.");
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (selectedChat) {
      socket.emit("joinChat", selectedChat._id);

      const messageHandler = (message) => {
        if (message.chatId === selectedChat._id) {
          dispatch(addMessage(message));
        }
      };

      socket.on("newMessage", messageHandler);

      return () => {
        socket.off("newMessage", messageHandler);
      };
    }
  }, [selectedChat, dispatch]);

  useEffect(() => {
    if (selectedChat) {
      handleFetchMessages();
    }
  }, [selectedChat]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";

      const newHeight = Math.min(textAreaRef.current.scrollHeight, 150);
      textAreaRef.current.style.height = `${newHeight}px`;
    }
  }, [newMessageText]);

  useEffect(() => {
    if (selectedChat) {
      setNewMessageText("");
    }
  }, [selectedChat]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {selectedChat && (
          <>
            <img src={user_icon} alt="user_icon" className={styles.user_icon} />
            <h4 className={styles.chat_name}>
              {selectedChat.firstName} {selectedChat.lastName}
            </h4>
            <button
              className={styles.update}
              onClick={handleEditModalOpen}
            ></button>
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
            <button className={styles.send_icon} onClick={handleSendMessage} />
            <textarea
              ref={textAreaRef}
              className={styles.input}
              placeholder="Type your message"
              disabled={messagesStatus === "loading"}
              value={newMessageText}
              onChange={(event) => setNewMessageText(event.target.value)}
              onKeyDown={handleEnterKeyPress}
              rows={1}
            />
          </>
        )}
      </div>
      {isEditModalOpen && (
        <ChatModal
          onClose={() => setIsEdiModalOpen(false)}
          isEdit={true}
          chat={selectedChat}
        />
      )}
    </div>
  );
}

export default ChatWindow;
