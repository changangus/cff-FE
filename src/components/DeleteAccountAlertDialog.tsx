import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDeleteUserMutation } from '../generated/graphql';
import { useRouter } from 'next/router';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [, deleteUser] = useDeleteUserMutation();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteUser();
    handleClose();
    router.push('/')
  } 

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete your account?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All data will be deleted including any fridges you have added to our database. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" style={{background: "#d42f26"}} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}