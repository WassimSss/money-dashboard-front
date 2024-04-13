import { configureStore } from '@reduxjs/toolkit'
import users from './features/users/usersSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            users
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Pour localStorage

// import users from './features/users/usersSlice';

// const persistConfig = {
//     key: 'root',
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, users);

// export const makeStore = () => {
//     const store = configureStore({
//         reducer: {
//             users: persistedReducer,
//         },
//     });

//     const persistor = persistStore(store);
//     return { store, persistor };
// };
