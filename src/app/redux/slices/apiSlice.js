import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk('apicom/fetchData', async () => {
  const response = await axios.get("http://localhost:5000/api/tasks");
  return response.data;
});

export const deleteData = createAsyncThunk('apicom/deleteData', async (id) => {
  await axios.delete(`http://localhost:5000/api/tasks/${id}`);
  return id; // Return the id of the deleted item
});

const apiSlice = createSlice({
  name: 'apicom',
  initialState: {
    contains: [],
    loading: true,
    drawer: false,
    open: true,
    editing: false,
    selectedRow: null,
  },
  reducers: {
    setRows: (state, action) => {
      state.contains = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDrawer: (state, action) => {
      state.drawer = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setEditing: (state, action) => {
      state.editing = action.payload;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.contains = action.payload;
      state.loading = false;
    })
    .addCase(deleteData.fulfilled, (state, action) => {
      state.contains = state.contains.filter(item => item.id !== action.payload);
    });
  },
});

export const { setRows, setLoading, setDrawer, setOpen, setEditing, setSelectedRow } = apiSlice.actions;
export default apiSlice.reducer;
