import { Box, Button, Link } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import Alert from '@material-ui/lab/Alert';
import { withUrqlClient, NextComponentType } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  const router = useRouter();
  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      <Box width='40%' height='40%'>
        <Formik
          initialValues={{
            newPassword: '',
            confirmNewPassword: ''
          }}
          onSubmit={async (values, { setErrors }) => {
            if (values.newPassword !== values.confirmNewPassword) {
              setErrors({ confirmNewPassword: 'Passwords do not match' })
            }
            const response = await changePassword({
              token,
              newPassword: values.newPassword
            });
            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ('token' in errorMap) {
                setTokenError(errorMap.token)
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
              // change password worked
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
      {tokenError.length > 1 ? 
      <Box width='50%' mt={4}>
        <Alert severity='error'>{tokenError}</Alert>
      </Box> 
      : null }
    </Box>
  );
}

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  }
}

export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword as unknown as NextComponentType);