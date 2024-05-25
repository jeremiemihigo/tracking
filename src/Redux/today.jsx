/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  today: [],
  readtoday: '',
  readtodayError: ''
};
export const Readtoday = createAsyncThunk('today/Readtoday', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://worldtimeapi.org/api/timezone/Africa/Lubumbashi');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const today = createSlice({
  name: 'today',
  initialState,
  reducers: {},
  extraReducers: {
    [Readtoday.pending]: (state, action) => {
      return {
        ...state,
        readtoday: 'pending',
        readtodayError: ''
      };
    },
    [Readtoday.fulfilled]: (state, action) => {
      return {
        today: action.payload,
        readtoday: 'success',
        readtodayError: ''
      };
    },
    [Readtoday.rejected]: (state, action) => {
      return {
        ...state,
        readtoday: 'rejected',
        readtodayError: action.payload
      };
    }
  }
});

export default today.reducer;
