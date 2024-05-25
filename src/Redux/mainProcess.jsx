/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { config, lien_read, lien_post, lien_update } from 'static/Lien';

const initialState = {
  main: [],
  getmain: '',
  getmainError: '',
  postmain: '',
  postmainError: '',
  putmain: '',
  putMainError: ''
};
export const ReadMain = createAsyncThunk('main/ReadMain', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read + '/main', config);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const PostMain = createAsyncThunk('main/PostMain', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/main', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const putMain = createAsyncThunk('main/putMain', async (data, { rejectWithValue }) => {
  try {
    const { title, _id } = data;
    const response = await axios.put(lien_update + '/main', { title, _id }, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const main = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: {
    [ReadMain.pending]: (state, action) => {
      return {
        ...state,
        getmain: 'pending',
        getmainError: '',
        postmain: '',
        postmainError: '',
        putmain: '',
        putMainError: ''
      };
    },
    [ReadMain.fulfilled]: (state, action) => {
      return {
        main: action.payload,
        getmain: 'success',
        getmainError: '',
        postmain: '',
        postmainError: '',
        putmain: '',
        putMainError: ''
      };
    },
    [ReadMain.rejected]: (state, action) => {
      return {
        ...state,
        getmain: 'rejected',
        getmainError: action.payload,
        postmain: '',
        postmainError: '',
        putmain: '',
        putMainError: ''
      };
    },
    [PostMain.pending]: (state, action) => {
      return {
        ...state,
        getmain: '',
        getmainError: '',
        postmain: 'pending',
        postmainError: '',
        putmain: '',
        putMainError: ''
      };
    },
    [PostMain.fulfilled]: (state, action) => {
      return {
        main: [action.payload, ...state.main],
        getmain: 'success',
        getmainError: '',
        postmain: '',
        postmainError: '',
        putmain: '',
        putMainError: ''
      };
    },
    [PostMain.rejected]: (state, action) => {
      return {
        ...state,
        getmain: '',
        getmainError: '',
        postmain: 'rejected',
        postmainError: action.payload,
        putmain: '',
        putMainError: ''
      };
    },
    [putMain.pending]: (state, action) => {
      return {
        ...state,
        getmain: '',
        getmainError: '',
        postmain: '',
        postmainError: '',
        putmain: 'pending',
        putMainError: ''
      };
    },
    [putMain.fulfilled]: (state, action) => {
      const m = state.main.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        main: m,
        getmain: '',
        getmainError: '',
        postmain: '',
        postmainError: '',
        putmain: 'success',
        putMainError: ''
      };
    },
    [putMain.rejected]: (state, action) => {
      return {
        ...state,
        getmain: '',
        getmainError: '',
        postmain: '',
        postmainError: '',
        putmain: 'rejected',
        putMainError: action.payload
      };
    }
  }
});

export default main.reducer;
