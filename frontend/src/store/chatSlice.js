import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChats, createChat, deleteChat } from "../api/api";

export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  const response = await getChats();
  return response.data;
});

export const createNewChat = createAsyncThunk(
  "chat/createNewChat",
  async (chatData, { rejectWithValue }) => {
    try {
      const response = await createChat(chatData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.errors);
      }
      return rejectWithValue({ error: error.message });
    }
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
    newChatErrors: null,
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setNewChatErrors: (state, action) => {
      state.newChatErrors = action.payload;
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
        state.newChatErrors = null;
      })
      .addCase(createNewChat.rejected, (state, action) => {
        state.newChatErrors = action.payload;
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

export const { setSelectedChat, setNewChatErrors } = chatSlice.actions;
export default chatSlice.reducer;
