import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getChats, deleteChat } from "../../api/api";

import styles from "./ChatList.module.css";
import ChatListItem from "../ChatListItem/ChatListItem";

function ChatList() {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const response = await getChats();
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast.error("Error fetching chats.");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Chats</h3>
      <ul className={styles.chat_list}>
        {chats.map((chat) => (
          <ChatListItem key={chat._id} chat={chat} />
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
