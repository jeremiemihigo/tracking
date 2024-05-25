/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { config, lien_read, lien_post, lien_update } from 'static/Lien';

const initialState = {
  action: [],
  getaction: '',
  getactionError: '',
  postaction: '',
  postactionError: '',
  putaction: '',
  putactionError: '',
  postStatusLabel: '',
  postStatusLabelError: ''
};
export const Readaction = createAsyncThunk('action/Readaction', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read + '/action', config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Postaction = createAsyncThunk('action/Postaction', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/action', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Putaction = createAsyncThunk('action/Putaction', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(lien_update + '/action', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const PoststatusLabel = createAsyncThunk('action/PoststatusLabel', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/statusLabel', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const action = createSlice({
  name: 'action',
  initialState,
  reducers: {},
  extraReducers: {
    [Readaction.pending]: (state, action) => {
      return {
        ...state,
        getaction: 'pending',
        getactionError: '',
        postaction: '',
        postactionError: '',
        putaction: '',
        putactionError: '',
        postStatusLabel: '',
        postStatusLabelError: ''
      };
    },
    [Readaction.fulfilled]: (state, action) => {
      return {
        action: action.payload,
        getaction: 'success',
        getactionError: '',
        postaction: '',
        postactionError: '',
        putaction: '',
        putactionError: '',
        postStatusLabel: '',
        postStatusLabelError: ''
      };
    },
    [Readaction.rejected]: (state, action) => {
      return {
        ...state,
        getaction: 'rejected',
        getactionError: action.payload,
        postaction: '',
        postactionError: '',
        putaction: '',
        putactionError: '',
        postStatusLabel: '',
        postStatusLabelError: ''
      };
    },
    [Postaction.pending]: (state, action) => {
      return {
        ...state,
        getaction: '',
        getactionError: '',
        postaction: 'pending',
        postactionError: '',
        putaction: '',
        putactionError: '',
        postStatusLabel: '',
        postStatusLabelError: ''
      };
    },
    [Postaction.fulfilled]: (state, action) => {
      return {
        action: [action.payload, ...state.action],
        getaction: '',
        getactionError: '',
        postaction: '',
        postactionError: '',
        putaction: '',
        putactionError: '',
        postStatusLabel: '',
        postStatusLabelError: ''
      };
    },
    [Postaction.rejected]: (state, action) => {
      return {
        ...state,
        getaction: '',
        getactionError: '',
        postaction: 'rejected',
        postactionError: action.payload,
        putaction: '',
        putactionError: '',
        postStatusLabel: '',
        postStatusLabelError: ''
      };
    },
    [Putaction.pending]: (state, action) => {
      return {
        ...state,
        getaction: '',
        getactionError: '',
        postaction: '',
        postactionError: '',
        putaction: 'pending',
        putactionError: '',
        postStatusLabel: '',
        postStatusLabelError: ''
      };
    },
    [Putaction.fulfilled]: (state, action) => {
      const m = state.action.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        action: m,
        getaction: '',
        getactionError: '',
        postaction: '',
        postactionError: '',
        putaction: 'success',
        putactionError: '',
        postStatusLabel: '',
        postStatusLabelError: ''
      };
    },
    [Putaction.rejected]: (state, action) => {
      return {
        ...state,
        getaction: '',
        getactionError: '',
        postaction: '',
        postactionError: '',
        putaction: 'rejected',
        putactionError: action.payload,
        postStatusLabel: '',
        postStatusLabelError: ''
      };
    },
    [PoststatusLabel.pending]: (state, action) => {
      return {
        ...state,
        getaction: '',
        getactionError: '',
        postaction: '',
        postactionError: '',
        putaction: '',
        putactionError: '',
        postStatusLabel: 'pending',
        postStatusLabelError: ''
      };
    },
    [PoststatusLabel.fulfilled]: (state, action) => {
      const m = state.action.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        action: m,
        getaction: '',
        getactionError: '',
        postaction: '',
        postactionError: '',
        putaction: '',
        putactionError: '',
        postStatusLabel: 'success',
        postStatusLabelError: ''
      };
    },
    [PoststatusLabel.rejected]: (state, action) => {
      return {
        ...state,
        getaction: '',
        getactionError: '',
        postaction: '',
        postactionError: '',
        putaction: '',
        putactionError: '',
        postStatusLabel: 'rejected',
        postStatusLabelError: action.payload
      };
    }
  }
});

export default action.reducer;
