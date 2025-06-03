import { createContext, useState } from "react";

export const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <chatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </chatContext.Provider>
  );
};
