import { useState } from "react";

import styles from "./NewChatModal.module.css";

function NewChatModal({ onClose, onCreateChat }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName.trim() === "" || lastName.trim() === "") {
      setError(true);
      return;
    }

    setError(false);
    onCreateChat({ firstName, lastName });
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2 className={styles.title}>Create New Chat</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor="firstName">
              First Name
            </label>
            <input
              className={styles.input}
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor="lastName">
              Last Name:
            </label>
            <input
              className={styles.input}
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className={styles.error}>
              First Name and Last Name are required.
            </p>
          )}

          <div className={styles.buttons}>
            <button type="submit" className={styles.create_button}>
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancel_button}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewChatModal;
