import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Api';

export const fetchProfileById = createAsyncThunk('userProfile/fetchProfileById', async () => {
    try {
        const response = await api.profile.get(Headers);
        return response;
    } catch (error) {}
});
// export const editProfileById = createAsyncThunk('userProfile/editProfileById', async (data) => {
//     try {
//         const response = await api.profile.get();
//         return response.data.data;
//     } catch (error) {}
// });
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

            console.log(action.payload.data);
        });
        builder.addCase(fetchProfileById.pending, (state, action) => {
            state.profile.loading = true;

        
        });
    }
});

// export const { updateOrders, changeOrderStatus } = userProfileSlice.actions;
export default userProfileSlice.reducer;
