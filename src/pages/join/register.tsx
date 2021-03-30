import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const Register: React.FC<{}> = ({ }) => {
    const [, register] = useRegisterMutation();
    const router = useRouter()
    return (
        <Box
            height="90vh"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center">
            <Box mt={2} mb={2}>
                <Typography variant="h4">Register Form</Typography>
            </Box>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register(values);
                    console.log(response);
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors));
                    } else if (response.data?.register.user) {
                        // register worked:
                        router.push("/")
                    }


                }}
                >
                {({ isSubmitting }) => (
                    <Form>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-around"
                            height="50%"
                            width="100%"
                        >
                            <Field
                                component={TextField}
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                variant="outlined" />
                            <Field
                                component={TextField}
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                variant="outlined" />
                            <Field
                                component={TextField}
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined" />
                            <Field
                                component={TextField}
                                id="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                type="password" />
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={isSubmitting}
                            >Register</Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default withUrqlClient(createUrqlClient, {ssr: false})(Register);