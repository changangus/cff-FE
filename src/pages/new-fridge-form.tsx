import { Box, Typography, Button, TextareaAutosize, Input } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCreateFridgeMutation, useMeQuery } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';


interface NewFridgeFormProps {

}

const NewFridgeForm: React.FC<NewFridgeFormProps> = ({ }) => {
  const [, createFridge] = useCreateFridgeMutation();
  const [{ data }] = useMeQuery();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(data?.me);

  return (
    <Box
      height="90vh"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center">
      <Box mt={2} mb={2}>
        <Typography variant="h4">New Fridge:</Typography>
      </Box>
      <Formik
        initialValues={{
          name: '',
          address: '',
          description: ''
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createFridge({ inputs: values });
          console.log(response);
          router.push('/');
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: '70%' }}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              height="50%"
              width="100%"
            >
              <Field
                component={TextField}
                id="name"
                label="Fridge Name"
                name="name"
                variant="outlined" />
              <Field
                component={TextField}
                id="address"
                name="address"
                label="Address"
                variant="outlined" />
              <Field
                component={TextField}
                multiline
                rows={6}
                id="description"
                name="description"
                label="Description"
                variant="outlined"
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >Add New Fridge</Button>
            </Box>
          </Form>
        )}
      </Formik>
      {!isLoggedIn && (
        <Box mt={2}>
          <Alert severity='error'>You must be logged in to add a fridge</Alert>
        </Box>
      )} 
    </Box>
  );
}

export default NewFridgeForm;