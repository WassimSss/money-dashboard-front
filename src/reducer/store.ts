// import { configureStore } from '@reduxjs/toolkit'
// import users from './features/users/usersSlice'

// export const makeStore = () => {
//     return configureStore({
//         reducer: {
//             users
//         },
//     })
// }

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']

// // import { configureStore } from '@reduxjs/toolkit';
// // import { persistReducer, persistStore } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage'; // Pour localStorage

// // import users from './features/users/usersSlice';

// // const persistConfig = {
// //     key: 'root',
// //     storage,
// // };

// // const persistedReducer = persistReducer(persistConfig, users);

// // export const makeStore = () => {
// //     const store = configureStore({
// //         reducer: {
// //             users: persistedReducer,
// //         },
// //     });

// //     const persistor = persistStore(store);
// //     return { store, persistor };
// // };

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { userReducer } from "./slices/usersSlice";
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
    key: "users",
    storage: storage,
    // whitelist: ["users"],
};

const persistedReducer = persistReducer(authPersistConfig, userReducer);

const rootReducer = combineReducers({
    users: persistedReducer,
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
