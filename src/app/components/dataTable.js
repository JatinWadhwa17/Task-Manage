'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DataTable.css';
import PersistentDrawerRight from './persistentDrawerRit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setRows, setDrawer, setOpen, setEditing, setSelectedRow, deleteData } from '../redux/slices/apiSlice';

function DataTable() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.api.contains);
  console.log(rows);
  const drawer = useSelector((state) => state.api.drawer);
  const open = useSelector((state) => state.api.open);
  const editing = useSelector((state) => state.api.editing);
  const selectedRow = useSelector((state) => state.api.selectedRow);

  useEffect(() => {
    dispatch(fetchData()).then(() => setLoading(false));
  }, [dispatch]);

  const handleEditClick = (row) => {
    dispatch(setEditing(true));
    dispatch(setSelectedRow(row));
    dispatch(setDrawer(true));
    dispatch(setOpen(true));
  };

  const handleAddClick = () => {
    dispatch(setEditing(false));
    dispatch(setDrawer(true));
    dispatch(setOpen(true));
    dispatch(setSelectedRow(null));
  };
  const handleDeleteClick = async (id) => {
    dispatch(deleteData(id));
  }

  const handleIconClick = (row) => {
    router.push(`./components/${row.id}/${row.description}/${row.dueDate}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {drawer && <PersistentDrawerRight />}
      <div className="datatable-container">
        <h1>Daily Tasks</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>DueDate</th>
              <th><button className='button button-add' onClick={handleAddClick}>Add</button></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.title}</td>
                <td>{row.description}</td>
                <td>{row.dueDate}</td>
                <td>
                  <button className='button button-icon' onClick={() => handleIconClick(row)}><VisibilityIcon /></button>
                </td>
                <td>
                  <button className=' button button-edit' onClick={() => handleEditClick(row)}>Edit</button>
                </td>
                <td>
                  <button className='button' onClick={() => handleDeleteClick(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;
