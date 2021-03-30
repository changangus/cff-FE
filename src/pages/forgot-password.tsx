import { Box, Button, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useForgotPasswordMutation } from '../generated/graphql';
import React, { useState } from 'react'
import Alert from '@material-ui/lab/Alert';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface ForgotPasswordProps {

}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ }) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <Box display='flex' flexDirection='column' justifyContent='space-between' alignItems='center'>
      <Box width='40%' height='40%' mt={2}>
        <Typography>Submit your email and a link will be sent:</Typography>
        <Formik
          initialValues={{
            email: ''
          }}
          onSubmit={async (values, { setErrors }) => {
            await forgotPassword(values);
            setComplete(true);
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
                  variant="outlined"
                  type="email"
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting} >
                  Send Email Link
              </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      {complete ?
        <Box width='50%' mt={4}>
          <Alert severity='success'>Email was sent!</Alert>
        </Box>
        : null}
    </Box>



  );
}

export default withUrqlClient(createUrqlClient, {ssr: false})(ForgotPassword);