import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getChats, deleteChat } from "../../api/api";

import styles from "./ChatList.module.css";
import ChatListItem from "../ChatListItem/ChatListItem";

function ChatList({ searchQuery }) {
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

  const handleDeleteChat = async (chatId) => {
    if (!window.confirm("Do you want to delete this chat?")) {
      return;
    }

    try {
      await deleteChat(chatId);
      setChats((prev) => prev.filter((chat) => chat._id !== chatId));
      toast.success("Chat successfully deleted!");
    } catch (error) {
      console.error("Error deleting chat", error);
      toast.error("Error deleting chat.");
    }
  };

  const filteredChats = chats.filter((chat) => {
    const fullName = (chat.firstName + " " + chat.lastName).toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Chats</h3>
      <ul className={styles.chat_list}>
        {filteredChats.map((chat) => (
          <ChatListItem
            key={chat._id}
            chat={chat}
            onDelete={handleDeleteChat}
          />
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
