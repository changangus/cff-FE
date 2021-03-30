import { Box, Button, Link } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { NextPage } from 'next';
import router from 'next/router';
import React from 'react'
import { toErrorMap } from '../../utils/toErrorMap';

interface ChangePasswordProps {

}

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Box display='flex' justifyContent='center'>
      <Box width='40%' height='40%'>
        <Formik
          initialValues={{
            newPassword: '',
            confirmNewPassword: ''
          }}
          onSubmit={async (values, { setErrors }) => {
            // const response = await login(values);
            // if (response.data?.login.errors) {
            //   setErrors(toErrorMap(response.data.login.errors));
            // } else if (response.data?.login.user) {
            //   router.push('/');
            // }
          }}>
          <Form>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              height="50%">
              <Field
                component={TextField}
                id="newPassword"
                name="newPassword"
                label="New Password"
                type="password"
                variant="outlined"
              />
              <Field
                component={TextField}
                id="confirmNewPassword"
                name="confirmNewPassword"
                label="Confirm Password"
                variant="outlined"
                type="password"
              />
              <Button
                color="primary"
                variant="contained"
                type="submit">
                Change Password
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
}

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  }
}

export default ChangePassword;