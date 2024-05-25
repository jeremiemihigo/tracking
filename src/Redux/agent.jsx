/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { config, lien_read, lien_post, lien_update } from 'static/Lien';

const initialState = {
  agent: [],
  getagent: '',
  getagentError: '',
  postagent: '',
  postagentError: '',
  resetPassword: '',
  resetPasswordError: ''
};
export const Readagent = createAsyncThunk('agent/Readagent', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read + '/agent', config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Postagent = createAsyncThunk('agent/Postagent', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/agent', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Reset = createAsyncThunk('agent/Reset', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(lien_update + '/reset', { id: data }, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const agent = createSlice({
  name: 'agent',
  initialState,
  reducers: {},
  extraReducers: {
    [Readagent.pending]: (state, action) => {
      return {
        ...state,
        getagent: 'pending',
        getagentError: '',
        postagent: '',
        postagentError: '',
        resetPassword: '',
        resetPasswordError: ''
      };
    },
    [Readagent.fulfilled]: (state, action) => {
      return {
        agent: action.payload,
        getagent: 'success',
        getagentError: '',
        postagent: '',
        postagentError: '',
        resetPassword: '',
        resetPasswordError: ''
      };
    },
    [Readagent.rejected]: (state, action) => {
      return {
        ...state,
        getagent: 'rejected',
        getagentError: action.payload,
        postagent: '',
        postagentError: '',
        resetPassword: '',
        resetPasswordError: ''
      };
    },
    [Postagent.pending]: (state, action) => {
      return {
        ...state,
        getagent: '',
        getagentError: '',
        postagent: 'pending',
        postagentError: '',
        resetPassword: '',
        resetPasswordError: ''
      };
    },
    [Postagent.fulfilled]: (state, action) => {
      return {
        agent: [action.payload, ...state.agent],
        getagent: '',
        getagentError: '',
        postagent: '',
        postagentError: '',
        resetPassword: '',
        resetPasswordError: ''
      };
    },
    [Postagent.rejected]: (state, action) => {
      return {
        ...state,
        getagent: '',
        getagentError: '',
        postagent: 'rejected',
        postagentError: action.payload,
        resetPassword: '',
        resetPasswordError: ''
      };
    },
    [Reset.pending]: (state, action) => {
      return {
        ...state,
        getagent: '',
        getagentError: '',
        postagent: '',
        postagentError: '',
        resetPassword: 'pending',
        resetPasswordError: ''
      };
    },
    [Reset.fulfilled]: (state, action) => {
      const d = state.agent.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        agent: d,
        getagent: '',
        getagentError: '',
        postagent: '',
        postagentError: '',
        resetPassword: 'success',
        resetPasswordError: ''
      };
    },
    [Reset.rejected]: (state, action) => {
      return {
        ...state,
        getagent: '',
        getagentError: '',
        postagent: '',
        postagentError: '',
        resetPassword: 'rejected',
        resetPasswordError: action.payload
      };
    }
  }
});

export default agent.reducer;
