import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { createNewChat, setNewChatErrorsNull } from "../../store/chatSlice";

import styles from "./EditChatModal.module.css";

function EditChatModal({ onClose }) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const newChatErrors = useSelector((state) => state.chat.newChatErrors);

  const handleCreateNewChat = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createNewChat({ firstName, lastName })).unwrap();

      toast.success(`Created chat with ${firstName} ${lastName}.`);
      onClose();
    } catch (error) {
      console.error("Error creating chat", error);
      toast.error("Error creating chat.");
    }
  };

  //VALIDATION

  const handleOnClose = () => {
    dispatch(setNewChatErrorsNull());
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2 className={styles.title}>Create New Chat</h2>
        <form onSubmit={handleCreateNewChat}>
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
            {newChatErrors && (
              <p className={styles.error}>{newChatErrors.firstName}</p>
            )}
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
            {newChatErrors && (
              <p className={styles.error}>{newChatErrors.lastName}</p>
            )}
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.create_button}>
              Create
            </button>
            <button
              type="button"
              onClick={handleOnClose}
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

export default EditChatModal;
