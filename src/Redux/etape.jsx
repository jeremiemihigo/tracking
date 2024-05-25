/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {  config, lien_read, lien_post } from 'static/Lien';

const initialState = {
  etape: [],
  getetape: '',
  getetapeError: '',
  postetape: '',
  postetapeError: ''
};
export const Readetape = createAsyncThunk('etape/Readetape', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read + '/etape', config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Postetape = createAsyncThunk('etape/Postetape', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/etape', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const etape = createSlice({
  name: 'etape',
  initialState,
  reducers: {},
  extraReducers: {
    [Readetape.pending]: (state, action) => {
      return {
        ...state,
        getetape: 'pending',
        getetapeError: '',
        postetape: '',
        postetapeError: ''
      };
    },
    [Readetape.fulfilled]: (state, action) => {
      return {
        etape: action.payload,
        getetape: 'success',
        getetapeError: '',
        postetape: '',
        postetapeError: ''
      };
    },
    [Readetape.rejected]: (state, action) => {
      return {
        ...state,
        getetape: 'rejected',
        getetapeError: action.payload,
        postetape: '',
        postetapeError: ''
      };
    },
    [Postetape.pending]: (state, action) => {
      return {
        ...state,
        getetape: '',
        getetapeError: '',
        postetape: 'pending',
        postetapeError: ''
      };
    },
    [Postetape.fulfilled]: (state, action) => {
      return {
        etape: [action.payload, ...state.etape],
        getetape: '',
        getetapeError: '',
        postetape: '',
        postetapeError: ''
      };
    },
    [Postetape.rejected]: (state, action) => {
      return {
        ...state,
        getetape: '',
        getetapeError: '',
        postetape: 'rejected',
        postetapeError: action.payload
      };
    }
  }
});

export default etape.reducer;
