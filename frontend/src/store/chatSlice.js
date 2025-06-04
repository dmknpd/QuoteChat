import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChats, createChat, updateChat, deleteChat } from "../api/api";

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

export const updateExistingChat = createAsyncThunk(
  "chat/updateExistingChat",
  async ({ chatId, chatData }, { rejectWithValue }) => {
    try {
      const response = await updateChat(chatId, chatData);
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
    chatModalErrors: null,
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setChatModalErrors: (state, action) => {
      state.chatModalErrors = action.payload;
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
        state.chatModalErrors = null;
      })
      .addCase(createNewChat.rejected, (state, action) => {
        state.chatModalErrors = action.payload;
      })
      //updateExistingChat
      .addCase(updateExistingChat.fulfilled, (state, action) => {
        const index = state.chats.findIndex(
          (chat) => chat._id === action.payload._id
        );
        if (index !== -1) {
          state.chats[index] = action.payload;
        }

        if (state.selectedChat?._id === action.payload._id) {
          state.selectedChat = action.payload;
        }
        state.chatModalErrors = null;
      })
      .addCase(updateExistingChat.rejected, (state, action) => {
        state.chatModalErrors = action.payload;
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

export const { setSelectedChat, setChatModalErrors } = chatSlice.actions;
export default chatSlice.reducer;
