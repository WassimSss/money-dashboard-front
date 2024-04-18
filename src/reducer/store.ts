import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { userReducer } from "./slices/usersSlice";
import { moneyReducer } from "./slices/moneySlice";

// import users from './features/users/usersSlice'

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const authPersistConfig = {
    key: "auth",
    storage: storage,
    // whitelist: ["users"],
};

const moneyPersistConfig = {
    key: 'money',
    storage: storage,
};


const persistedReducer = persistReducer(authPersistConfig, userReducer);
const persistedMoneyReducer = persistReducer(moneyPersistConfig, moneyReducer);


const rootReducer = combineReducers({
    users: persistedReducer,
    moneys: persistedMoneyReducer, 
});


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
