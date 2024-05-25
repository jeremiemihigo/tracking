/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {  config, lien_read, lien_post, lien_update } from 'static/Lien';

const initialState = {
  role: [],
  getrole: '',
  getroleError: '',
  postrole: '',
  postroleError: '',
  putrole: '',
  putroleError: '',
  addmembre: '',
  addmembreError: ''
};
export const Readrole = createAsyncThunk('role/Readrole', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(lien_read + '/role', config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const Postrole = createAsyncThunk('role/Postrole', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(lien_post + '/role', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const putrole = createAsyncThunk('role/putrole', async (data, { rejectWithValue }) => {
  try {
    const { title, _id } = data;
    const response = await axios.put(lien_update + '/role', { title, _id }, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const AddMembre = createAsyncThunk('role/AddMembre', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(lien_update + '/addMember', data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const role = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: {
    [Readrole.pending]: (state, action) => {
      return {
        ...state,
        getrole: 'pending',
        getroleError: '',
        postrole: '',
        postroleError: '',
        putrole: '',
        putroleError: '',
        addmembre: '',
        addmembreError: ''
      };
    },
    [Readrole.fulfilled]: (state, action) => {
      return {
        role: action.payload,
        getrole: 'success',
        getroleError: '',
        postrole: '',
        postroleError: '',
        putrole: '',
        putroleError: '',
        addmembre: '',
        addmembreError: ''
      };
    },
    [Readrole.rejected]: (state, action) => {
      return {
        ...state,
        getrole: 'rejected',
        getroleError: action.payload,
        postrole: '',
        postroleError: '',
        putrole: '',
        putroleError: '',
        addmembre: '',
        addmembreError: ''
      };
    },
    [Postrole.pending]: (state, action) => {
      return {
        ...state,
        getrole: '',
        getroleError: '',
        postrole: 'pending',
        postroleError: '',
        putrole: '',
        putroleError: '',
        addmembre: '',
        addmembreError: ''
      };
    },
    [Postrole.fulfilled]: (state, action) => {
      return {
        role: [action.payload, ...state.role],
        getrole: 'success',
        getroleError: '',
        postrole: '',
        postroleError: '',
        putrole: '',
        putroleError: '',
        addmembre: '',
        addmembreError: ''
      };
    },
    [Postrole.rejected]: (state, action) => {
      return {
        ...state,
        getrole: '',
        getroleError: '',
        postrole: 'rejected',
        postroleError: action.payload,
        putrole: '',
        putroleError: '',
        addmembre: '',
        addmembreError: ''
      };
    },
    [putrole.pending]: (state, action) => {
      return {
        ...state,
        getrole: '',
        getroleError: '',
        postrole: '',
        postroleError: '',
        putrole: 'pending',
        putroleError: '',
        addmembre: '',
        addmembreError: ''
      };
    },
    [putrole.fulfilled]: (state, action) => {
      const m = state.role.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        role: m,
        getrole: '',
        getroleError: '',
        postrole: '',
        postroleError: '',
        putrole: 'success',
        putroleError: '',
        addmembre: '',
        addmembreError: ''
      };
    },
    [putrole.rejected]: (state, action) => {
      return {
        ...state,
        getrole: '',
        getroleError: '',
        postrole: '',
        postroleError: '',
        putrole: 'rejected',
        putroleError: action.payload,
        addmembre: '',
        addmembreError: ''
      };
    },
    [AddMembre.pending]: (state, action) => {
      return {
        ...state,
        getrole: '',
        getroleError: '',
        postrole: '',
        postroleError: '',
        putrole: '',
        putroleError: '',
        addmembre: 'pending',
        addmembreError: ''
      };
    },
    [AddMembre.fulfilled]: (state, action) => {
      const m = state.role.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        role: m,
        getrole: '',
        getroleError: '',
        postrole: '',
        postroleError: '',
        putrole: '',
        putroleError: '',
        addmembre: 'success',
        addmembreError: ''
      };
    },
    [AddMembre.rejected]: (state, action) => {
      return {
        ...state,
        getrole: '',
        getroleError: '',
        postrole: '',
        postroleError: '',
        putrole: '',
        putroleError: '',
        addmembre: 'rejected',
        addmembreError: action.payload
      };
    }
  }
});

export default role.reducer;
