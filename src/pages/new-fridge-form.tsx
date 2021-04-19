import { Box, Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCreateFridgeMutation, useMeQuery } from '../generated/graphql';
import ReactS3Client from 'react-aws-s3-typescript';
import { s3Config } from '../utils/s3Config';

const NewFridgeForm: React.FC = ({ }) => {
  const [, createFridge] = useCreateFridgeMutation();
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(data?.me);
  const [file, setFile] = useState({} as File);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!fetching && data?.me) {
      setIsLoggedIn(data?.me)
    }
  });

  const uploadFile = async (): Promise<string> => {
    /* Import s3 config object and call the constrcutor */
    const s3 = new ReactS3Client(s3Config);
    const res = await s3.uploadFile(file);
    const url = res.location;
    setImageUrl(url);
    console.log(imageUrl);
    return url;
  }

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
          description: '',
          instagram: '',
          twitter: ''
        }}
        onSubmit={async (values, { setFieldValue }) => {
          const res = await uploadFile(); 
          console.log(res)
          setFieldValue('imageUrl', res);
          await createFridge({ inputs: {...values, imageUrl: res} });
          router.push('/');
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: '70%' }}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              height="85%"
              width="100%"
              mt={6}
            >
              <Field
                component={TextField}
                id="name"
                label="Fridge Name"
                name="name"
                variant="outlined"
                required />
              <Field
                component={TextField}
                id="address"
                name="address"
                label="Address"
                variant="outlined" 
                required />
              <Field
                component={TextField}
                id="instagram"
                name="instagram"
                label="Instagram Link"
                variant="outlined" />
              <Field
                component={TextField}
                id="twitter"
                name="twitter"
                label="Twitter Link"
                variant="outlined" />
              <Field
                component={TextField}
                multiline
                rows={6}
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                required
              />
              <Box
                display="flex"
                alignItems="center" 
                mb={2}
                mt={1}>
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload Image
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e: any) => {
                      setFile(e.target.files[0]);
                    }}
                    hidden
                  />
                  
                </Button>
                <Typography style={{marginLeft: "10px"}} variant="body1">{file.name}</Typography>
              </Box>

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