import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Box } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import { toErrorMap } from '../utils/toErrorMap';
import { useLoginMutation } from '../generated/graphql';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';

export interface LoginFormProps {
  open: boolean;
  handleClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  const { handleClose, open } = props;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <Box margin={2}>
        <DialogTitle id="simple-dialog-title">Login:</DialogTitle>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              router.push('/');
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
                  disabled={isSubmitting}>
                    Login
              </Button>
              <Box width="100%" display="flex" justifyContent="center" mt={3}>
                <NextLink href='/join/register'>
                    <Link href='' onClick={handleClose}>Create New Account</Link>
                </NextLink>
              </Box>
            </Box>
          </Form>
          )}
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
      <Box>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Login / Register
        </Button>
      </Box>
      <LoginForm open={open} handleClose={handleClose} />
    </div>
  );
};

export default LoginDialog;