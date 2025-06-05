import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000/api/chats" });

export const getChats = () => Api.get("/");
export const createChat = (data) => Api.post("/", data);
export const updateChat = (id, data) => Api.patch(`/${id}`, data);
export const deleteChat = (id) => Api.delete(`/${id}`);

export const getMessages = (chatId) => Api.get(`/${chatId}/messages`);
export const sendMessage = (chatId, data) =>
  Api.post(`/${chatId}/messages`, data);

export const toggleAutoSender = (enabled) =>
  Api.post("/auto-messages", { enabled });
