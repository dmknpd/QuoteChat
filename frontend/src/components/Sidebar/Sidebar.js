import { useState } from "react";

import styles from "./Sidebar.module.css";
import user_icon from "../../img/user_icon.svg";
import lens_icon from "../../img/lens_icon.svg";

import ChatList from "../ChatList/ChatList";

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.user_container}>
          <img src={user_icon} alt="user_icon" className={styles.user_icon} />
          <button className={styles.log_button}>Log in</button>
        </div>
        <div className={styles.search_container}>
          <img className={styles.lens_icon} src={lens_icon} alt="lens_icon" />
          <input
            className={styles.search}
            type="text"
            placeholder="Search or start new chat"
            onChange={(e) => setSearchQuery(e.target.value.trim())}
          />
        </div>
      </div>
      <ChatList searchQuery={searchQuery} />
    </div>
  );
}

export default Sidebar;
