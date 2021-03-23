import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {

}



const Register: React.FC<registerProps> = ({ }) => {
    const [, register] = useRegisterMutation();
    const router = useRouter()
    return (
        <Box
            height="100vh"
            width="100vw"
            display="flex"
            justifyContent="center"
            alignItems="center">
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
                    if(response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors));
                    } else if (response.data?.register.user) {
                        // register worked:
                        router.push("/")
                    }

                    
                }}>
                <Form>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-around"
                        height="50%"
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
                            >Register</Button>
                    </Box>
                </Form>
            </Formik>
        </Box>
    );
}

export default Register;