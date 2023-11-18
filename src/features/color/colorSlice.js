import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import colorService from './colorService';

const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getColors = createAsyncThunk('color/get-colors', async (thunkAPI) => {
    try {
        return await colorService.getColors();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const colorSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colors = action.payload;
                state.message = 'Success';
            })
            .addCase(getColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default colorSlice.reducer;
