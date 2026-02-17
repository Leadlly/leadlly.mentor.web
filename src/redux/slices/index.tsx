import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MentorPersonalInfoProps } from "@/helpers/types";

export interface UserProps {
  user: MentorPersonalInfoProps | null;
}

const initialState: UserProps = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (
      state,
      action: PayloadAction<MentorPersonalInfoProps | null>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { userData } = userSlice.actions;

export default userSlice.reducer;
