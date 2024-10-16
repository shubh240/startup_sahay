import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  isLoading: false
};

const masterSlice = createSlice({
  name: "MASTER_SLICE",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setLoader } = masterSlice.actions;
export default masterSlice.reducer;
