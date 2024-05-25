/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {  config, lien_read, lien_post } from 'static/Lien';

const initialState = {
  departement: [],
  getdepartement: '',
  getdepartementError: '',
  postdepartement: '',
  postdepartementError: ''
};
export const Readdepartement = createAsyncThunk('departement/Readdepartement', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read + '/departement', config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Postdepartement = createAsyncThunk('departement/Postdepartement', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/departement', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const departement = createSlice({
  name: 'departement',
  initialState,
  reducers: {},
  extraReducers: {
    [Readdepartement.pending]: (state, action) => {
      return {
        ...state,
        getdepartement: 'pending',
        getdepartementError: '',
        postdepartement: '',
        postdepartementError: ''
      };
    },
    [Readdepartement.fulfilled]: (state, action) => {
      return {
        departement: action.payload,
        getdepartement: 'success',
        getdepartementError: '',
        postdepartement: '',
        postdepartementError: ''
      };
    },
    [Readdepartement.rejected]: (state, action) => {
      return {
        ...state,
        getdepartement: 'rejected',
        getdepartementError: action.payload,
        postdepartement: '',
        postdepartementError: ''
      };
    },
    [Postdepartement.pending]: (state, action) => {
      return {
        ...state,
        getdepartement: '',
        getdepartementError: '',
        postdepartement: 'pending',
        postdepartementError: ''
      };
    },
    [Postdepartement.fulfilled]: (state, action) => {
      return {
        departement: [action.payload, ...state.departement],
        getdepartement: '',
        getdepartementError: '',
        postdepartement: '',
        postdepartementError: ''
      };
    },
    [Postdepartement.rejected]: (state, action) => {
      return {
        ...state,
        getdepartement: '',
        getdepartementError: '',
        postdepartement: 'rejected',
        postdepartementError: action.payload
      };
    }
  }
});

export default departement.reducer;
