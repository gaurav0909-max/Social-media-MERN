import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Api';

export const fetchPostById = createAsyncThunk('userPost/fetchPostById', async () => {
    try {
        const response = await api.post.create();
        return response;
    } catch (error) {}
});

const initialState = {
    post:{loading:false, data:{}},
};

export const userPostSlice = createSlice({
    name: 'userPost',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPostById.fulfilled, (state, action) => {
            state.post.data = action.payload.data;
        });
        builder.addCase(fetchPostById.pending, (state, action) => {
            state.post.loading = true;
            state.post.data= null;
        });
    }
});

// export const { updateOrders, changeOrderStatus } = userPostSlice.actions;
export default userPostSlice.reducer;
