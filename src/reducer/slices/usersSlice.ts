import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    token: string,
    darkMode: boolean
  };
}

const initialState: UserState = {
  value: {
    token: "",
    darkMode: true
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
    },
    toggleDarkMode: (state) => {
      state.value.darkMode = !state.value.darkMode;
    }

  },
});

export const { addTokenToUser, disconnect, toggleDarkMode } = usersSlice.actions;
export const userReducer = usersSlice.reducer;