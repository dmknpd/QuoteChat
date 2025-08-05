import styles from "./MessageItem.module.css";

function MessageItem({ message }) {
  const { sender } = message;
  return (
    <li className={`${styles.message} ${styles[sender]}`}>
      <div className={styles.message_container}>
        <p className={styles.content}>{message.text}</p>
        <p className={styles.date}>
          {new Date(message.updatedAt).toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </li>
  );
}

export default MessageItem;
