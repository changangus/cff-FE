import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDeleteFridgeMutation } from '../generated/graphql';
import { useRouter } from 'next/router';

interface DeleteFridgeProps {
  id: string
}

const DeleteFridgeAlertDialog: React.FC<DeleteFridgeProps> = ({id}) => {
  const [open, setOpen] = React.useState(false);
  const [, deleteFridge] = useDeleteFridgeMutation();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteFridge({id});
    handleClose();
    router.reload();
  } 

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this fridge?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            It will be removed permanently from our database. 
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
};

export default DeleteFridgeAlertDialog;