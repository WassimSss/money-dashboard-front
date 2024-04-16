import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    token: string
  };
}

const initialState: UserState = {
  value: {
    token: ""
  }
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addTokenToUser: (state, action: PayloadAction<string>) => {
      state.value.token = action.payload;
    },
    disconnect: (state) => {
      state.value.token = ""
    }
  },
});

export const { addTokenToUser, disconnect } = usersSlice.actions;
export const userReducer = usersSlice.reducer;