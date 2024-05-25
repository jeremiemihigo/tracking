/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { lien, config } from 'static/Lien';

const initialState = {
  demandeFeedback: [],
  getdemandeFeedback: '',
  getdemandeFeedbackError: ''
};
export const ReaddemandeFeedback = createAsyncThunk('demandeFeedback/ReaddemandeFeedback', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien + '/demandeFeedback', config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const demandeFeedback = createSlice({
  name: 'demandeFeedback',
  initialState,
  reducers: {},
  extraReducers: {
    [ReaddemandeFeedback.pending]: (state, action) => {
      return {
        ...state,
        getdemandeFeedback: 'pending',
        getdemandeFeedbackError: ''
      };
    },
    [ReaddemandeFeedback.fulfilled]: (state, action) => {
      return {
        demandeFeedback: action.payload,
        getdemandeFeedback: 'success',
        getdemandeFeedbackError: ''
      };
    },
    [ReaddemandeFeedback.rejected]: (state, action) => {
      return {
        ...state,
        getdemandeFeedback: 'rejected',
        getdemandeFeedbackError: action.payload
      };
    }
  }
});

export default demandeFeedback.reducer;
