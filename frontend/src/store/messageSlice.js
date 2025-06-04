import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages, sendMessage } from "../api/api";

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (chatId) => {
    const response = await getMessages(chatId);
    return response.data;
  }
);

export const sendNewMessage = createAsyncThunk(
  "message/sendNewMessage",
  async ({ chatId, messageText }) => {
    const response = await sendMessage(chatId, messageText);
    return response.data;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder //fetchMessages
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //sendNewMessage
      .addCase(sendNewMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.error = null;
      })
      .addCase(sendNewMessage.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
