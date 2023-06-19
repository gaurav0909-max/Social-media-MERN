import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (params,id, { rejectWithValue }) => {
    try {
        // console.log('id', id)
        const response = await api.myPost.edit(id);
      return response
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

// Create a slice
const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state) => {
      state.error = null;
      state.data = null;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

// Export the asyncThunk and the slice actions and reducer
export default postSlice.reducer;