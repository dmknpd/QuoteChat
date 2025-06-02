import styles from "./ChatWindow.module.css";
import user_icon from "../../img/user_icon.svg";
import paper_plane from "../../img/paper_plane.svg";

function Chat() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={user_icon} alt="user_icon" className={styles.user_icon} />
        <div className={styles.chat_name}>Alice Freeman</div>
      </div>
      <div className={styles.main}></div>
      <div className={styles.footer}>
        <img src={paper_plane} alt="send_icon" className={styles.send_icon} />
        <input
          className={styles.input}
          type="text"
          placeholder="Type your message"
        />
      </div>
    </div>
  );
}

export default Chat;
