import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UnreadMessagesState {
  [room: string]: number;
}

const initialState: UnreadMessagesState = {};

export const unreadMessagesSlice = createSlice({
  name: "unreadMessages",
  initialState,
  reducers: {
    // Action to set unread messages for a specific room
    setUnreadMessages: (state, action: PayloadAction<{ room: string; count: number }>) => {
      const { room, count } = action.payload;
      state[room] = count;
    },
    // Action to set unread messages for multiple rooms at once
    setMultipleUnreadMessages: (state, action: PayloadAction<Record<string, number>>) => {
      return action.payload;
    },
  },
});

export const { setUnreadMessages, setMultipleUnreadMessages } = unreadMessagesSlice.actions;

export default unreadMessagesSlice.reducer;
