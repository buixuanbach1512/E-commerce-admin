import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

const initialState = {
    categories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getCategories = createAsyncThunk('category/get-categories', async (thunkAPI) => {
    try {
        return await categoryService.getCategories();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categories = action.payload;
                state.message = 'Success';
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default categorySlice.reducer;
