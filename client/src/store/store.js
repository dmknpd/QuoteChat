import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./chatSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    message: messageReducer,
  },
});
