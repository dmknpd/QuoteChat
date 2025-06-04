import { useState } from "react";

import styles from "./Sidebar.module.css";
import user_icon from "../../img/user_icon.svg";
import lens_icon from "../../img/lens_icon.svg";

import ChatList from "../ChatList/ChatList";
import NewChatModal from "../NewChatModal/NewChatModal";

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.user_container}>
          <img src={user_icon} alt="user_icon" className={styles.user_icon} />
          <button className={styles.log_button}>Log in</button>
        </div>
        <div className={styles.search_container}>
          <img className={styles.lens_icon} src={lens_icon} alt="lens_icon" />
          <button
            className={styles.plus_icon}
            onClick={() => setIsModalOpen(true)}
          />
          <input
            className={styles.search}
            type="text"
            placeholder="Search or start new chat"
            onChange={(e) => setSearchQuery(e.target.value.trim())}
          />
        </div>
      </div>
      <h3 className={styles.title}>Chats</h3>
      <ChatList searchQuery={searchQuery} />
      {isModalOpen && <NewChatModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Sidebar;
