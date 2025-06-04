import { useDispatch } from "react-redux";

import { setSelectedChat } from "../../store/chatSlice";

import styles from "./ChatListItem.module.css";
import user_icon from "../../img/user_icon.svg";
import close_icon from "../../img/close_icon.svg";

function ChatListItem({ chat, onDelete }) {
  const dispatch = useDispatch();
  return (
    <li
      className={styles.container}
      onClick={() => dispatch(setSelectedChat(chat))}
    >
      <img src={user_icon} alt="user_icon" className={styles.user_icon} />
      <div className={styles.content}>
        <div className={styles.name}>
          {chat.firstName} {chat.lastName}
        </div>
        <div className={styles.message}>{chat?.lastMessage?.text || ""}</div>
      </div>

      <div className={styles.date}>
        {new Date(chat.updatedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </div>
      <img
        src={close_icon}
        alt="close_icon"
        className={styles.delete}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(chat._id);
        }}
      />
    </li>
  );
}

export default ChatListItem;
