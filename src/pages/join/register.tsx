import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useMutation } from 'urql';

interface registerProps {

}

const REGISTER_MUT = `
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!){
        register(options: {
        firstName: $firstName, 
        lastName: $lastName
            email: $email,
        password: $password,
            }){
            errors{
            message
            field
        }
        user {
            firstName
            lastName
            email
            _id
        }
        }
    }
`

const Register: React.FC<registerProps> = ({ }) => {
    const [, register] = useMutation(REGISTER_MUT);

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
                onSubmit={(values) => {
                    console.log(values);
                    return register(values);
                    // const response = await register(values);
                    // if(response.data?.register.errors){
                    //     setErrors(toErrorMap(response.data.register.errors));
                    // } else if(response)

                    
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