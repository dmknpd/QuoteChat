import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChats, createChat, deleteChat } from "../api/api";

export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  const response = await getChats();
  return response.data;
});

export const createNewChat = createAsyncThunk(
  "chat/createNewChat",
  async (chatData) => {
    const response = await createChat(chatData);
    return response.data;
  }
);

export const removeChat = createAsyncThunk(
  "chat/removeChat",
  async (chatId) => {
    await deleteChat(chatId);
    return chatId;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    selectedChat: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder //fetchChats
      .addCase(fetchChats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chats = action.payload;
        state.error = null;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //createNewChat
      .addCase(createNewChat.fulfilled, (state, action) => {
        state.chats.push(action.payload);
        state.error = null;
      })
      .addCase(createNewChat.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //removeChat
      .addCase(removeChat.fulfilled, (state, action) => {
        state.chats = state.chats.filter((chat) => chat._id !== action.payload);
        if (state.selectedChat?._id === action.payload) {
          state.selectedChat = null;
        }
        state.error = null;
      })
      .addCase(removeChat.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
