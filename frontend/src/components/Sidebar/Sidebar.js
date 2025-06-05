import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setSearchQuery } from "../../store/chatSlice";
import { toggleAutoSender } from "../../api/api";

import styles from "./Sidebar.module.css";
import user_icon from "../../img/user_icon.svg";
import lens_icon from "../../img/lens_icon.svg";

import ChatList from "../ChatList/ChatList";
import ChatModal from "../ChatModal/ChatModal";

function Sidebar() {
  const dispatch = useDispatch();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAutoSending, setIsAutoSending] = useState(false);

  const handleModalOpen = (event) => {
    event.preventDefault();
    setIsCreateModalOpen(true);
  };

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value.trim()));
  };

  const handleToggleAutoSender = async () => {
    try {
      const newState = !isAutoSending;
      await toggleAutoSender(newState);
      setIsAutoSending(newState);
      toast.success(`Auto-sender ${newState ? "enabled" : "disabled"}!`);
    } catch (error) {
      console.error("Error toggling auto-sender", error);
      toast.error("Could not change auto-sender state.");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.user_container}>
          <img src={user_icon} alt="user_icon" className={styles.user_icon} />
          <button className={styles.log_button}>Log in</button>
        </div>
        <div className={styles.search_container}>
          <img className={styles.lens_icon} src={lens_icon} alt="lens_icon" />
          <button className={styles.plus_icon} onClick={handleModalOpen} />
          <input
            className={styles.search}
            type="text"
            placeholder="Search or start new chat"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className={styles.title_container}>
        <h3 className={styles.title}>Chats</h3>
        <button
          onClick={handleToggleAutoSender}
          className={`${styles.auto_sender} ${
            isAutoSending ? styles.active : ""
          }`}
        >
          {isAutoSending ? "Stop Auto-Sender" : "Start Auto-Sender"}
        </button>
      </div>
      <ChatList />
      {isCreateModalOpen && (
        <ChatModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
}

export default Sidebar;
