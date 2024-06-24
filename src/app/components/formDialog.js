'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ dialog, setDialog, handleSubmitDialog }) {
  const handleClose = () => {
    setDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={dialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const confirmation = formJson.confirmation;
            handleSubmitDialog(confirmation);
          },
        }}
      >
        <DialogTitle>Verify</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit these details? Type 'Submit' if you want to move forward
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="confirmation"
            name="confirmation"
            label=""
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
