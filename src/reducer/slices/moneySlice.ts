import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MoneyState {
    value: {
        balance: number | undefined,
        income: number | undefined,
        saving: number | undefined,
        expenses: number | undefined,
    };
}

const initialState: MoneyState = {
    value: {
        balance: 0,
        income: 0,
        saving: 0,
        expenses: 0,
    }
};

export const moneySlice = createSlice({
    name: "moneys",
    initialState,
    reducers: {
        setBalanceToStore: (state, action: PayloadAction<number | undefined>) => {
            state.value.balance = action.payload;
        },
        setIncomeToStore: (state, action: PayloadAction<number | undefined>) => {
            state.value.income = action.payload;
        },
        setSavingToStore: (state, action: PayloadAction<number | undefined>) => {
            state.value.saving = action.payload;
        },
        setExpensesToStore: (state, action: PayloadAction<number | undefined>) => {
            state.value.expenses = action.payload;
        },
    },
});

export const { setBalanceToStore, setIncomeToStore, setSavingToStore, setExpensesToStore } = moneySlice.actions;
export const moneyReducer = moneySlice.reducer;