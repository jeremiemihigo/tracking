/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { lien, config } from 'static/Lien';

const initialState = {
  shop: [],
  getshop: '',
  getshopError: ''
};
export const Readshop = createAsyncThunk('shop/Readshop', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien + '/shop', config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const shop = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: {
    [Readshop.pending]: (state, action) => {
      return {
        ...state,
        getshop: 'pending',
        getshopError: ''
      };
    },
    [Readshop.fulfilled]: (state, action) => {
      return {
        shop: action.payload,
        getshop: 'success',
        getshopError: ''
      };
    },
    [Readshop.rejected]: (state, action) => {
      return {
        ...state,
        getshop: 'rejected',
        getshopError: action.payload
      };
    }
  }
});

export default shop.reducer;
