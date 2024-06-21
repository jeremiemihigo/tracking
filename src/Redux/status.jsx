/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { config, lien_post, lien_read, lien_update } from 'static/Lien';

const initialState = {
  status: [],
  getstatus: '',
  getstatusError: '',
  poststatus: '',
  poststatusError: '',
  putstatus: '',
  putstatusError: '',
  editProcessAction: '',
  editProcessActionError: ''
};
export const ReadStatus = createAsyncThunk('status/Readstatus', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read + '/status', config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Poststatus = createAsyncThunk('status/Poststatus', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/status', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Putstatus = createAsyncThunk('status/Putstatus', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(lien_update + '/status', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const EditStatus = createAsyncThunk('status/Putstatus', async (data, { rejectWithValue }) => {
  try {
    const { donner, link } = data;
    const response = await axios.put(`${lien_update}/${link}`, donner, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const status = createSlice({
  name: 'status',
  initialState,
  reducers: {},
  extraReducers: {
    [ReadStatus.pending]: (state, action) => {
      return {
        ...state,
        getstatus: 'pending',
        getstatusError: '',
        poststatus: '',
        poststatusError: '',
        putstatus: '',
        putstatusError: '',
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [ReadStatus.fulfilled]: (state, action) => {
      return {
        status: action.payload,
        getstatus: 'success',
        getstatusError: '',
        poststatus: '',
        poststatusError: '',
        putstatus: '',
        putstatusError: '',
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [ReadStatus.rejected]: (state, action) => {
      return {
        ...state,
        getstatus: 'rejected',
        getstatusError: action.payload,
        poststatus: '',
        poststatusError: '',
        putstatus: '',
        putstatusError: '',
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [Poststatus.pending]: (state, action) => {
      return {
        ...state,
        getstatus: '',
        getstatusError: '',
        poststatus: 'pending',
        poststatusError: '',
        putstatus: '',
        putstatusError: '',
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [Poststatus.fulfilled]: (state, action) => {
      return {
        status: [action.payload, ...state.status],
        getstatus: '',
        getstatusError: '',
        poststatus: '',
        poststatusError: '',
        putstatus: '',
        putstatusError: '',
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [Poststatus.rejected]: (state, action) => {
      return {
        ...state,
        getstatus: '',
        getstatusError: '',
        poststatus: 'rejected',
        poststatusError: action.payload,
        putstatus: '',
        putstatusError: '',
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [Putstatus.pending]: (state, action) => {
      return {
        ...state,
        getstatus: '',
        getstatusError: '',
        poststatus: '',
        poststatusError: '',
        putstatus: 'pending',
        putstatusError: '',
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [Putstatus.fulfilled]: (state, action) => {
      const m = state.status.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        status: m,
        getstatus: '',
        getstatusError: '',
        poststatus: '',
        poststatusError: '',
        putstatus: 'success',
        putstatusError: '',
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [Putstatus.rejected]: (state, action) => {
      return {
        ...state,
        getstatus: '',
        getstatusError: '',
        poststatus: '',
        poststatusError: '',
        putstatus: 'rejected',
        putstatusError: action.payload,
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [EditStatus.pending]: (state, action) => {
      return {
        ...state,
        getstatus: '',
        getstatusError: '',
        poststatus: '',
        poststatusError: '',
        putstatus: 'pending',
        putstatusError: '',
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [EditStatus.fulfilled]: (state, action) => {
      const m = state.status.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        status: m,
        getstatus: '',
        getstatusError: '',
        poststatus: '',
        poststatusError: '',
        putstatus: 'success',
        putstatusError: '',
        editProcessAction: '',
        editProcessActionError: ''
      };
    },
    [EditStatus.rejected]: (state, action) => {
      return {
        ...state,
        getstatus: '',
        getstatusError: '',
        poststatus: '',
        poststatusError: '',
        putstatus: 'rejected',
        putstatusError: action.payload,
        editProcessAction: '',
        editProcessActionError: ''
      };
    }
  }
});

export default status.reducer;
