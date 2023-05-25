import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Api';

export const fetchProfileById = createAsyncThunk('userProfile/fetchProfileById', async () => {
    try {
        const response = await api.profile.get(Headers);
        return response;
    } catch (error) {}
});
export const editProfileById = createAsyncThunk('userProfile/editProfileById', async () => {
    try {
        const response = await api.profile.put(FormData);
        return response;
    } catch (error) {}
});
const initialState = {
    profile:{loading:false, data:{}},
    editProfile:{loading:false, data:{}}
};

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileById.fulfilled, (state, action) => {
            state.profile.data = action.payload.data;
        });
        builder.addCase(fetchProfileById.pending, (state, action) => {
            state.profile.loading = true;
        });
        builder.addCase(editProfileById.fulfilled, (state, action) => {
            state.profile.data = action.payload.data;
        });
    }
});

// export const { updateOrders, changeOrderStatus } = userProfileSlice.actions;
export default userProfileSlice.reducer;
