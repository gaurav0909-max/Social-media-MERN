import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Api';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await api.myPost.get()
    return response;
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
});

// Create a slice
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.error = null;
      state.data = null;
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

// Export the asyncThunk and the slice actions and reducer
export default dataSlice.reducer;
