import axios from "axios";

const Api = axios.create({
  baseURL: "https://quotechat-e1qu.onrender.com/api/chats",
});

export const getChats = () => Api.get("/");
export const createChat = (data) => Api.post("/", data);
export const updateChat = (id, data) => Api.patch(`/${id}`, data);
export const deleteChat = (id) => Api.delete(`/${id}`);

export const getMessages = (chatId) => Api.get(`/${chatId}/messages`);
export const sendMessage = (chatId, data) =>
  Api.post(`/${chatId}/messages`, data);

export const getAutoSenderState = () => Api.get("/auto-sender");
export const toggleAutoSender = (enabled) =>
  Api.post("/auto-sender", { enabled });
