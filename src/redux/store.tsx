import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slices/userSlice/index";
import unreadMessagesReducer from "@/redux/slices/unreadMessagesSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      unreadMessages: unreadMessagesReducer
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
