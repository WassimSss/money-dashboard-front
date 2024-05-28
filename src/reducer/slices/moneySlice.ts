import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface MoneyState {
    value: {
        balance: number | undefined,
        income: number | undefined,
        saving: number | undefined,
        expenses: number | undefined,
        debts: number | undefined,
        expensesofTheDay: number | undefined,
        expensesofTheWeek: number | undefined,
        expensesofTheMonth: number | undefined,

    };
}

const initialState: MoneyState = {
    value: {
        balance: 0,
        income: 0,
        saving: 0,
        expenses: 0,
        debts: 0,
        expensesofTheDay: 0,
        expensesofTheWeek: 0,
        expensesofTheMonth: 0,
    }
};

export const moneySlice = createSlice({
    name: "moneys",
    initialState,
    reducers: {
        setBalanceToStore: (state, action: PayloadAction<number | undefined>) => {
            console.log(action.payload)
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
        setDebtsToStore: (state, action: PayloadAction<number | undefined>) => {
            state.value.debts = action.payload;
        },
        setExpensesOfTheDayToStore: (state, action: PayloadAction<number | undefined>) => {
            state.value.expensesofTheDay = action.payload;
        },
        setExpensesOfTheWeekToStore: (state, action: PayloadAction<number | undefined>) => {
            state.value.expensesofTheWeek = action.payload;
        },
        setExpensesOfTheMonthToStore: (state, action: PayloadAction<number | undefined>) => {
            state.value.expensesofTheMonth = action.payload;
        }
    },
});

export const { setBalanceToStore, setIncomeToStore, setSavingToStore, setExpensesToStore, setDebtsToStore, setExpensesOfTheDayToStore, setExpensesOfTheWeekToStore, setExpensesOfTheMonthToStore } = moneySlice.actions;
export const moneyReducer = moneySlice.reducer;