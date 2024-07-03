import { configureStore } from "@reduxjs/toolkit";
import { habitReducer } from "./Reducers/habitReducer";

const store = configureStore({ reducer: { habitReducer } });

export default store;
