import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoidungService } from "../service/nguoidung.service";

export const getValueUserApi = createAsyncThunk(
    "nguoiDung/getValueUserApi",
    async (_, thunkAPI) => {
        const resolve = await nguoidungService.getListUser();
        console.log(resolve);
        return resolve.data.content;
    }
);

const initialState = {
    listNguoiDung: [],
};

const nguoiDungSlice = createSlice({
    name: "nguoiDung",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getValueUserApi.fulfilled, (state, action) => {
            console.log(action);
            state.listNguoiDung = action.payload;
        });
        builder.addCase(getValueUserApi.rejected, (state, action) => {
            console.log(action);
        });
    },
});

export const { } = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
