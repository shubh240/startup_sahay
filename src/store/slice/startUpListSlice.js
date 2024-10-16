import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoader } from "./masterSlice";
import * as API from "../../utils/api.service";

export const getStartUpDetails = createAsyncThunk("StartUpList", async (submitData, { dispatch }) => {
    dispatch(setLoader(true))
    const data = await API.startUpList(submitData);
    console.log(data)
    dispatch(setLoader(false))
    return data;

});


const initialState = {
    StartUpList: {
        data: [],
        error: null,
    }
};

const startUpListSlice = createSlice({
    name: "StartUpList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStartUpDetails.fulfilled, (state, action) => {
                state.StartUpList.data = action.payload.data;
            })
            .addCase(getStartUpDetails.rejected, (state, action) => {
                state.StartUpList.error = action.error.message;
            })
    },
});

export default startUpListSlice.reducer;