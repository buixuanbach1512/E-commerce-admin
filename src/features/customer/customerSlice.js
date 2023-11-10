import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerService from './customerService';

const initialState = {
    customers: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getUsers = createAsyncThunk('customer/get-customers', async (thunkAPI) => {
    try {
        return await customerService.getUsers();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const customerSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.customers = action.payload;
                state.message = 'Success';
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default customerSlice.reducer;
