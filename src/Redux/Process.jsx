/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {  config, lien_read, lien_post, lien_update } from 'static/Lien';

const initialState = {
  process: [],
  getProcess: '',
  getProcessError: '',
  postProcess: '',
  postProcessError: '',
  putProcess: '',
  putProcessError: ''
};
export const ReadProcess = createAsyncThunk('process/ReadProcess', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read + '/process', config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const PostProcess = createAsyncThunk('process/PostProcess', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/process', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const PutProcess = createAsyncThunk('process/PutProcess', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(lien_update + '/process', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const process = createSlice({
  name: 'process',
  initialState,
  reducers: {},
  extraReducers: {
    [ReadProcess.pending]: (state, action) => {
      return {
        ...state,
        getProcess: 'pending',
        getProcessError: '',
        postProcess: '',
        postProcessError: '',
        putProcess: '',
        putProcessError: ''
      };
    },
    [ReadProcess.fulfilled]: (state, action) => {
      return {
        process: action.payload,
        getProcess: 'success',
        getProcessError: '',
        postProcess: '',
        postProcessError: '',
        putProcess: '',
        putProcessError: ''
      };
    },
    [ReadProcess.rejected]: (state, action) => {
      return {
        ...state,
        getProcess: 'rejected',
        getProcessError: action.payload,
        postProcess: '',
        postProcessError: '',
        putProcess: '',
        putProcessError: ''
      };
    },
    [PostProcess.pending]: (state, action) => {
      return {
        ...state,
        getProcess: '',
        getProcessError: '',
        postProcess: 'pending',
        postProcessError: '',
        putProcess: '',
        putProcessError: ''
      };
    },
    [PostProcess.fulfilled]: (state, action) => {
      return {
        process: [action.payload, ...state.process],
        getProcess: '',
        getProcessError: '',
        postProcess: '',
        postProcessError: '',
        putProcess: '',
        putProcessError: ''
      };
    },
    [PostProcess.rejected]: (state, action) => {
      return {
        ...state,
        getProcess: '',
        getProcessError: '',
        postProcess: 'rejected',
        postProcessError: action.payload,
        putProcess: '',
        putProcessError: ''
      };
    },
    [PutProcess.pending]: (state, action) => {
      return {
        ...state,
        getProcess: '',
        getProcessError: '',
        postProcess: '',
        postProcessError: '',
        putProcess: 'pending',
        putProcessError: ''
      };
    },
    [PutProcess.fulfilled]: (state, action) => {
      const m = state.process.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        process: m,
        getProcess: '',
        getProcessError: '',
        postProcess: '',
        postProcessError: '',
        putProcess: 'success',
        putProcessError: ''
      };
    },
    [PutProcess.rejected]: (state, action) => {
      return {
        ...state,
        getProcess: '',
        getProcessError: '',
        postProcess: '',
        postProcessError: '',
        putProcess: 'rejected',
        putProcessError: action.payload
      };
    }
  }
});

export default process.reducer;
