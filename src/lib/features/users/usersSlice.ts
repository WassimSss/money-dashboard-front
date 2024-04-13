// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface TokenPayload {
//     token: string;
// }

// interface UserState {
//     value: {
//         token: string
//     }
// };

// const initialState = {
//     value: {
//         token: ""
//     },
// };

// export const usersSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {
//         addTokenToUser: (state, action: PayloadAction<TokenPayload>) => {
//             // console.log("actionPayload : ", action.payload.token)
//             state.value.token = action.payload.token;
//         },
//     },
// });

// export const { addTokenToUser } = usersSlice.actions;
// export default usersSlice.reducer;

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
  },
});

export const { addTokenToUser } = usersSlice.actions;
export const userReducer = usersSlice.reducer;