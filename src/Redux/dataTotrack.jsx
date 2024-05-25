/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { lien_read } from 'static/Lien';

const initialState = {
  datatotrack: [],
  readdatatotrack: '',
  readdatatotrackError: ''
};
export const Readdatatotrack = createAsyncThunk('datatotrack/Readdatatotrack', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read+"/read_data_to_track");
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
        readdatatotrackError: ''
      };
    },
    [Readdatatotrack.fulfilled]: (state, action) => {
      return {
        datatotrack: action.payload,
        readdatatotrack: 'success',
        readdatatotrackError: ''
      };
    },
    [Readdatatotrack.rejected]: (state, action) => {
      return {
        ...state,
        readdatatotrack: 'rejected',
        readdatatotrackError: action.payload
      };
    }
  }
});

export default datatotrack.reducer;
