import { configureStore } from "@reduxjs/toolkit";
import { habitReducer } from "./Reducers/habitReducer";

//Configuring store
const store = configureStore({ reducer: { habitReducer } });

export default store;
