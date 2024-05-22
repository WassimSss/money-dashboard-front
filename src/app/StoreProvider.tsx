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