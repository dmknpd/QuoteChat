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
    searchQuery: "",
  },
  reducers: {
    setSelectedChat: (state, action) => {
      if (
        !state.selectedChat ||
        state.selectedChat._id !== action.payload._id
      ) {
        state.selectedChat = action.payload;
      }
    },
    setChatModalErrors: (state, action) => {
      state.chatModalErrors = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addChat: (state, action) => {
      state.chats.unshift(action.payload);
    },
    updateChatInList: (state, action) => {
      const index = state.chats.findIndex(
        (chat) => chat._id === action.payload._id
      );
      if (index !== -1) {
        const oldLastMessage = state.chats[index].lastMessage;
        state.chats[index] = { ...action.payload, lastMessage: oldLastMessage };
      }
      if (state.selectedChat?._id === action.payload._id) {
        state.selectedChat = { ...state.selectedChat, ...action.payload };
      }
    },
    updateLastMessage: (state, action) => {
      const { chatId, lastMessage } = action.payload;
      const chatIndex = state.chats.findIndex((chat) => chat._id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].lastMessage = lastMessage;
        const updatedChat = state.chats.splice(chatIndex, 1);
        state.chats.unshift(updatedChat[0]);
      }
    },
    deleteChatFromList: (state, action) => {
      const chatIdToRemove = action.payload;
      state.chats = state.chats.filter((chat) => chat._id !== chatIdToRemove);
      if (state.selectedChat?._id === chatIdToRemove) {
        state.selectedChat = null;
      }
      state.error = null;
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
        state.chatModalErrors = null;
      })
      .addCase(createNewChat.rejected, (state, action) => {
        state.chatModalErrors = action.payload;
      })
      //updateExistingChat
      .addCase(updateExistingChat.fulfilled, (state, action) => {
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

export const {
  setSelectedChat,
  setChatModalErrors,
  setSearchQuery,
  addChat,
  updateChatInList,
  updateLastMessage,
  deleteChatFromList,
} = chatSlice.actions;
export default chatSlice.reducer;
