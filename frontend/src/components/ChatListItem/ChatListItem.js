import styles from "./ChatListItem.module.css";
import user_icon from "../../img/user_icon.svg";

function ChatListItem() {
  return (
    <div className={styles.container}>
      <img src={user_icon} alt="user_icon" className={styles.user_icon} />
      <div className={styles.content}>
        <div className={styles.name}>Alice Freeman</div>
        <div className={styles.message}>Hello, whats up?</div>
      </div>

      <div className={styles.date}>Aug 17, 2022</div>
    </div>
  );
}

export default ChatListItem;
