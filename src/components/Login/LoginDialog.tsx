import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Box } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import router from 'next/router';
import { toErrorMap } from '../../utils/toErrorMap';
import { useLoginMutation } from '../../generated/graphql';

export interface LoginFormProps {
  open: boolean;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [, login ] = useLoginMutation();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose()
  };

  return (
    <Dialog 
      onClose={handleClose} 
      aria-labelledby="simple-dialog-title" 
      open={open}>
      <Box margin={2}>
      <DialogTitle id="simple-dialog-title">Login</DialogTitle>
      <Formik
        initialValues={{
            email: '',
            password: ''
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if(response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            handleClose();
            router.push('/');
          }
        }}>
          <Form>
              <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                  height="50%">
                  <Field
                      component={TextField} 
                      id="email" 
                      name="email" 
                      label="Email" 
                      type="email"
                      variant="outlined"
                      />
                  <Field
                      component={TextField} 
                      id="password" 
                      name="password" 
                      label="Password" 
                      variant="outlined" 
                      type="password"
                      />
                  <Button 
                      color="primary" 
                      variant="contained" 
                      type="submit"
                      >Login</Button>
              </Box>
          </Form>
        </Formik>
      </Box>
    </Dialog>
  );
}

const LoginDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Login
      </Button>
      <LoginForm open={open} onClose={handleClose} />
    </div>
  );
};

export default LoginDialog;