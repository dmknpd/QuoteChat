import styles from "./ChatListItem.module.css";
import user_icon from "../../img/user_icon.svg";

function ChatListItem({ chat }) {
  return (
    <li className={styles.container}>
      <img src={user_icon} alt="user_icon" className={styles.user_icon} />
      <div className={styles.content}>
        <div className={styles.name}>
          {chat.firstName} {chat.lastName}
        </div>
        <div className={styles.message}>Hello, whats up?</div>
      </div>

      <div className={styles.date}>
        {new Date(chat.updatedAt).toLocaleString()}
      </div>
    </li>
  );
}

export default ChatListItem;
