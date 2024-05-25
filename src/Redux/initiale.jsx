/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {  config, lien_post, lien_read } from 'static/Lien';

const initialState = {
  initiale: [],
  getinitiale: '',
  getinitialeError: '',
  postinitiale: '',
  postinitialeError: ''
};
export const Readinitiale = createAsyncThunk('initiale/Readinitiale', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read + '/initiale', config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Postinitiale = createAsyncThunk('initiale/Postinitiale', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/initiale', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initiale = createSlice({
  name: 'initiale',
  initialState,
  reducers: {},
  extraReducers: {
    [Readinitiale.pending]: (state, action) => {
      return {
        ...state,
        getinitiale: 'pending',
        getinitialeError: '',
        postinitiale: '',
        postinitialeError: ''
      };
    },
    [Readinitiale.fulfilled]: (state, action) => {
      return {
        initiale: action.payload,
        getinitiale: 'success',
        getinitialeError: '',
        postinitiale: '',
        postinitialeError: ''
      };
    },
    [Readinitiale.rejected]: (state, action) => {
      return {
        ...state,
        getinitiale: 'rejected',
        getinitialeError: action.payload,
        postinitiale: '',
        postinitialeError: ''
      };
    },
    [Postinitiale.pending]: (state, action) => {
      return {
        ...state,
        getinitiale: '',
        getinitialeError: '',
        postinitiale: 'pending',
        postinitialeError: ''
      };
    },
    [Postinitiale.fulfilled]: (state, action) => {
      return {
        initiale: [action.payload, ...state.initiale],
        getinitiale: 'success',
        getinitialeError: '',
        postinitiale: '',
        postinitialeError: ''
      };
    },
    [Postinitiale.rejected]: (state, action) => {
      return {
        ...state,
        getinitiale: '',
        getinitialeError: '',
        postinitiale: 'rejected',
        postinitialeError: action.payload
      };
    }
  }
});

export default initiale.reducer;
