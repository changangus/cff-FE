import React from 'react';
import { Formik, Form } from 'formik';
import { TextField,  } from '@material-ui/core';


interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    return (
        <div>
            <Formik 
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                }}
                onSubmit={(values) => { 
                    console.log(values)
                }}>
                <Form>
                    <TextField id="first-name" label="First Name" variant="outlined" />
                    <TextField id="last-name" label="Last Name" variant="outlined" />
                    <TextField id="email" label="Email" variant="outlined" />
                    <TextField id="password" label="Password" variant="outlined" type="password"/>
                    <TextField id="confirm-password" label="Confirm Password" variant="outlined" type="password" />
                </Form>
            </Formik>
        </div>
    );
}

export default Register;