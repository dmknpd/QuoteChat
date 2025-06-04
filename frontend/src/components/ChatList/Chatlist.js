import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { fetchChats, removeChat } from "../../store/chatSlice";

import styles from "./ChatList.module.css";
import ChatListItem from "../ChatListItem/ChatListItem";

function ChatList({ searchQuery }) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const chatStatus = useSelector((state) => state.chat.status);

  const handleFetchChats = async () => {
    try {
      await dispatch(fetchChats()).unwrap();
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
      await dispatch(removeChat(chatId)).unwrap();
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
    if (chatStatus === "idle") {
      handleFetchChats();
    }
  }, [chatStatus]);

  return (
    <div className={styles.container}>
      <ul className={styles.chat_list}>
        {chatStatus === "loading" && (
          <div className={styles.select}>
            <div class="loader"></div>
          </div>
        )}
        {chatStatus === "succeeded" && filteredChats.length !== 0 ? (
          filteredChats.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              onDelete={handleDeleteChat}
            />
          ))
        ) : (
          <div className={styles.select}>
            No chats found. Click the + button to create one.
          </div>
        )}
      </ul>
    </div>
  );
}

export default ChatList;
