import { configureStore } from "@reduxjs/toolkit";
import masterSlice from "./slice/masterSlice";
import startUpListSlice from "./slice/startUpListSlice";

const store = configureStore({
  reducer: {
    master: masterSlice,
    startUp : startUpListSlice,
  }

});

export default store;