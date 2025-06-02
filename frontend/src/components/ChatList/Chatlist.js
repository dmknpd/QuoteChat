import styles from "./ChatList.module.css";

import ChatListItem from "../ChatListItem/ChatListItem";

function ChatList() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Chats</h3>
      <div className={styles.chat_list}>
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </div>
    </div>
  );
}

export default ChatList;
