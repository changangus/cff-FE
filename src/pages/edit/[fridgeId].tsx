import { Box, Typography, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useUpdateFridgeMutation, useGetFridgeQuery } from '../../generated/graphql';
import ReactS3Client from 'react-aws-s3-typescript';
import { s3Config } from '../../utils/s3Config';


const UpdateFridgeForm: React.FC = ({}) => {
  const router = useRouter();
  const { fridgeId } = router.query;
  const [, updateFridge] = useUpdateFridgeMutation();
  const [{ data, fetching }] = useGetFridgeQuery({ variables: { id: fridgeId as string } });
  const [file, setFile] = useState(undefined as unknown as File);

  const uploadFile = async (): Promise<string> => {
    /* Import s3 config object and call the constrcutor */
    const s3 = new ReactS3Client(s3Config);
    const res = await s3.uploadFile(file);
    const url = res.location;
    return url;
  };
  
  if (!data?.getFridge) {
    return (
      <div>No Fridge Found</div>
    )
  } else {
    return (
      <Box
        height="90vh"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center">
        <Box mt={2} mb={2}>
          <Typography variant="h4">Update Fridge:</Typography>
        </Box>
        <Formik
          initialValues={{
            name: data.getFridge.name,
            address: data.getFridge.address,
            description: data.getFridge.description,
            instagram: data.getFridge.instagram,
            twitter: data.getFridge.twitter
          }}
          onSubmit={async (values, { setFieldValue }) => {
            if (!file) {
              await updateFridge({ inputs: { ...values, imageUrl: data.getFridge.imageUrl, id: data.getFridge._id as string} });
            } else {
              const res = await uploadFile();
              await updateFridge({ inputs: { ...values, imageUrl: res, id: data.getFridge._id as string } });
            }
            router.push('/my-account');
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
                      id="file"
                      onChange={(e: any) => {
                        setFile(e.target.files[0]);
                      }}
                      hidden
                    />

                  </Button>
                  <Typography style={{ marginLeft: "10px" }} variant="body1">{file ? file.name : ''}</Typography>
                </Box>

                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >Update Fridge</Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    )
  };
}

export default UpdateFridgeForm;