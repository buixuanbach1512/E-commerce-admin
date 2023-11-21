import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getProducts = createAsyncThunk('product/get-products', async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});
export const createProducts = createAsyncThunk('product/create-products', async (productData, thunkAPI) => {
    try {
        return await productService.createProduct(productData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
                state.message = 'Success';
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createProduct = action.payload;
            })
            .addCase(createProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default productSlice.reducer;
