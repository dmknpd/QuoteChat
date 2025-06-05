import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  createNewChat,
  updateExistingChat,
  setChatModalErrors,
} from "../../store/chatSlice";

import styles from "./ChatModal.module.css";

function ChatModal({ onClose, isEdit = false, chat = null }) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const chatModalErrors = useSelector((state) => state.chat.chatModalErrors);

  useEffect(() => {
    if (isEdit && chat) {
      setFirstName(chat.firstName || "");
      setLastName(chat.lastName || "");
    }
  }, [isEdit, chat]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(setChatModalErrors(null));

    if (!validate()) {
      return;
    }

    try {
      if (isEdit) {
        await dispatch(
          updateExistingChat({
            chatId: chat._id,
            chatData: { firstName, lastName },
          })
        ).unwrap();
        toast.success("Chat updated.");
      } else {
        await dispatch(createNewChat({ firstName, lastName })).unwrap();
        toast.success(`Created chat with ${firstName} ${lastName}.`);
      }
      handleOnClose();
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Error creating chat.");
    }
  };

  const validate = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    const errors = {};
    if (trimmedFirstName.length === 0) {
      errors.firstName = "First name is required.";
    } else if (trimmedFirstName.length < 3) {
      errors.firstName = "First name must be at least 3 characters.";
    } else if (trimmedFirstName.length > 20) {
      errors.firstName = "First name must be no more than 20 characters.";
    }

    if (trimmedLastName.length === 0) {
      errors.lastName = "Last name is required.";
    } else if (trimmedLastName.length < 3) {
      errors.lastName = "Last name must be at least 3 characters.";
    } else if (trimmedLastName.length > 20) {
      errors.lastName = "Last name must be no more than 20 characters.";
    }

    if (Object.keys(errors).length > 0) {
      dispatch(setChatModalErrors(errors));
      return false;
    }
    return true;
  };

  const handleOnClose = () => {
    setFirstName("");
    setLastName("");
    dispatch(setChatModalErrors(null));
    onClose();
  };

  return (
    <div className={styles.modal} onClick={handleOnClose}>
      <div
        className={styles.content}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className={styles.title}>
          {" "}
          {isEdit ? "Edit Chat" : "Create New Chat"}
        </h2>
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
            {chatModalErrors && (
              <p className={styles.error}>{chatModalErrors.firstName}</p>
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
            {chatModalErrors && (
              <p className={styles.error}>{chatModalErrors.lastName}</p>
            )}
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.create_button}>
              {isEdit ? "Update" : "Create"}
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

export default ChatModal;
