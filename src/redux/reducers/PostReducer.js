import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

// export const fetchPost = createAsyncThunk(
//   "post/fetchPost",
//   async (caption,id, { rejectWithValue }) => {
//     try {
//       console.log(id)
//         const response = await api.myPost.edit(id);
//         console.log(response)
//       return response.status === 200 ? {...caption}:{}
//     } catch (error) {
//       console.log("error", error);
//       return rejectWithValue(error);
//     }
//   }
// );

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (user) => {
    // console.log(caption)
    try {
        const response = await api.myPost.getByName(user);
        console.log(response)
      return response
    }catch (error) {
      // console.log(error);
      return error;
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