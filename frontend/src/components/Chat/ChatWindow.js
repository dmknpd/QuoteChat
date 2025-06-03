import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getMessages } from "../../api/api";
import { chatContext } from "../../context/ChatContext";
import MessageItem from "../MessageItem/MessageItem";

import styles from "./ChatWindow.module.css";
import user_icon from "../../img/user_icon.svg";
import paper_plane from "../../img/paper_plane.svg";

function Chat() {
  const { selectedChat } = useContext(chatContext);
  const [messages, setMessages] = useState([]);

  const fetchChatMessages = async () => {
    if (selectedChat) {
      try {
        const response = await getMessages(selectedChat._id);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Error fetching messages.");
      }
    } else {
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [selectedChat]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {selectedChat ? (
          <>
            <img src={user_icon} alt="user_icon" className={styles.user_icon} />
            <h4 className={styles.chat_name}>
              {selectedChat.firstName} {selectedChat.lastName}
            </h4>
          </>
        ) : (
          ""
        )}
      </div>
      <ul className={styles.main}>
        {selectedChat ? (
          messages.length === 0 ? (
            <div className={styles.select}>No messages in this chat yet.</div>
          ) : (
            messages.map((msg) => <MessageItem key={msg._id} message={msg} />)
          )
        ) : (
          <div className={styles.select}>
            Select who you would like to write to
          </div>
        )}
      </ul>
      <div className={styles.footer}>
        {selectedChat ? (
          <>
            <div
              src={paper_plane}
              alt="send_icon"
              className={styles.send_icon}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Type your message"
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Chat;
