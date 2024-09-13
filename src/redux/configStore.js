import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import nguoiDungSlice from "./nguoiDungSlice";
import skillSlice from "./skillSlice";

export default configureStore({
  reducer: { authSlice, nguoiDungSlice, skillSlice },
});
