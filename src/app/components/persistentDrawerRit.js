'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useFormik } from 'formik';
import axios from 'axios';
import FormDialog from './formDialog';
import { useSelector, useDispatch } from 'react-redux';
import { setRows, setEditing, setOpen } from '../redux/slices/apiSlice';

export default function PersistentDrawerRight() {
  const [dialog, setDialog] = useState(false);
  const [find, setFind] = useState(false);
  const selectedRow = useSelector((state) => state.api.selectedRow);
  const open = useSelector((state) => state.api.open);
  const rows = useSelector((state) => state.api.contains);
  const editing = useSelector((state) => state.api.editing);
  const dispatch = useDispatch();

  const initialValues = {
    title: selectedRow?.title || '',
    description: selectedRow?.description || '',
    dueDate: selectedRow?.dueDate || '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, actions) => {
      if (find) {
        setDialog(true);
      }
    },
  });

  useEffect(() => {
    if (selectedRow) {
      formik.setValues(selectedRow);
    }
  }, [selectedRow]);

  const handleSubmitDialog = (confirmation) => {
    if (confirmation === 'Submit') {
      formSubmission(formik.values, formik.resetForm);
    }
    setDialog(false);
  };

  const formSubmission = async (values, resetForm) => {
    if (editing) {
      await handleUpdate(values.id, values);
      dispatch(setEditing(false));
    } else {
      const response = await axios.post('http://localhost:5000/api/tasks', values);
      dispatch(setRows([...rows, response.data]));
    }
    resetForm();
    dispatch(setOpen(false));
  };

  const handleUpdate = async (id, values) => {
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, values);
    const updatedRow = rows.map((row) => (row.id === id ? res.data : row));
    dispatch(setRows(updatedRow));
  };

  const drawerList = (
    <Box sx={{ width: 550 }} className="drawer-content">
      <div className="drawer-header">
        {editing ? <h1>Edit Tasks</h1> : <h1>Add Tasks</h1>}
        <form onSubmit={formik.handleSubmit} className="drawer-form">

          <h3>Title</h3>
          <input
            type='text'
            name='title'
            placeholder='Enter Name'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />

          <h3>Description</h3>
          <input
            type='text'
            name='description'
            placeholder='Enter Description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />

          <h3>DueDate</h3>
          <input
            type='date'
            name='dueDate'
            placeholder='Enter DueDate'
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />

          <div className="form-buttons">
            <button type='submit' onClick={() => setFind(true)} className="button button-submit">Submit</button>
            <button type='button' onClick={() => { setFind(false); dispatch(setOpen(false)); }} className="button button-cancel">Cancel</button>
          </div>
          {dialog && <FormDialog dialog={dialog} setDialog={setDialog} handleSubmitDialog={handleSubmitDialog} />}
        </form>
      </div>
    </Box>
  );

  return (
    <div className="persistent-drawer-right">
      <Drawer open={open} onClose={() => dispatch(setOpen(false))}>
        {drawerList}
      </Drawer>
    </div>
  );
}
