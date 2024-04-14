// 'use client'
// import { useRef } from 'react'
// import { Provider } from 'react-redux'
// import { makeStore, AppStore } from '../lib/store'

// export default function StoreProvider({
//     children,
// }: {
//     children: React.ReactNode
// }) {
//     const storeRef = useRef<AppStore>()
//     if (!storeRef.current) {
//         // Create the store instance the first time this renders
//         storeRef.current = makeStore()
//     }

//     return <Provider store={storeRef.current}>{children}</Provider>
// }

"use client";

import { Provider } from "react-redux";
import { store } from "../reducer/store";
import { persistStore } from "redux-persist";

persistStore(store);
export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Provider store={store}>{children}</Provider>;
}