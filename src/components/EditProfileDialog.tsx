import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Box } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import { toErrorMap } from '../utils/toErrorMap';
import { useMeQuery, useUpdateUserMutation } from '../generated/graphql';

export interface EditProfileFormProps {
  open: boolean;
  handleClose: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = (props) => {
  const [, updateUser] = useUpdateUserMutation();
  const [{data}] = useMeQuery();
  const router = useRouter();
  const { handleClose, open } = props;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <Box margin={2}>
        <DialogTitle id="simple-dialog-title">Edit:</DialogTitle>
        <Formik
          initialValues={{
            firstName: data?.me?.firstName as string,
            lastName: data?.me?.lastName as string,
            email: data?.me?.email as string,
            password: ''
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await updateUser(values);
            if (response.data?.updateUser.errors) {
              setErrors(toErrorMap(response.data.updateUser.errors));
          } else if (response.data?.updateUser.user) {
              handleClose();
          }

          }}>
          {({ isSubmitting }) => (  
          <Form>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              height="50%">
              <Field
                component={TextField}
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
              />
              <Field
                component={TextField}
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
              />
              <Field
                component={TextField}
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="outlined"
              />
              
              <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}>
                    Update
              </Button>
            </Box>
          </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}

const EditProfileDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Edit Profile
        </Button>
      </Box>
      <EditProfileForm open={open} handleClose={handleClose} />
    </div>
  );
};

export default EditProfileDialog;