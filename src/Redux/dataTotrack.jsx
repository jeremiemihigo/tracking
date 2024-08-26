/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { config, lien_post, lien_read } from 'static/Lien';

const initialState = {
  datatotrack: [],
  readdatatotrack: '',
  readdatatotrackError: '',
  addclient: '',
  addclientError: ''
};
export const Readdatatotrack = createAsyncThunk('datatotrack/Readdatatotrack', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read + '/read_data_to_track');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Postdatatotrack = createAsyncThunk('datatotrack/Postdatatotrack', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/addoneclient', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const datatotrack = createSlice({
  name: 'datatotrack',
  initialState,
  reducers: {},
  extraReducers: {
    [Readdatatotrack.pending]: (state, action) => {
      return {
        ...state,
        readdatatotrack: 'pending',
        readdatatotrackError: '',
        addclient: '',
        addclientError: ''
      };
    },
    [Readdatatotrack.fulfilled]: (state, action) => {
      return {
        datatotrack: action.payload,
        readdatatotrack: 'success',
        readdatatotrackError: '',
        addclient: '',
        addclientError: ''
      };
    },
    [Readdatatotrack.rejected]: (state, action) => {
      return {
        ...state,
        readdatatotrack: 'rejected',
        readdatatotrackError: action.payload,
        addclient: '',
        addclientError: ''
      };
    },
    [Postdatatotrack.pending]: (state, action) => {
      return {
        ...state,
        readdatatotrack: '',
        readdatatotrackError: '',
        addclient: 'pending',
        addclientError: ''
      };
    },
    [Postdatatotrack.fulfilled]: (state, action) => {
      return {
        datatotrack: [action.payload, ...state.datatotrack],
        readdatatotrack: '',
        readdatatotrackError: '',
        addclient: 'success',
        addclientError: ''
      };
    },
    [Postdatatotrack.rejected]: (state, action) => {
      return {
        ...state,
        readdatatotrack: '',
        readdatatotrackError: '',
        addclient: 'rejected',
        addclientError: action.payload
      };
    }
  }
});

export default datatotrack.reducer;
