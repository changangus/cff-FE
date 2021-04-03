import { Box, Typography } from '@material-ui/core';
import React from 'react';

interface FridgePreviewProps {

}

const FridgePreview: React.FC<FridgePreviewProps> = ({ }) => {
  return (
    <Box
      fontSize={18}
      display="flex"
      flexDirection='column'
      alignItems="center"
    >
      <Typography variant="h5">Fridge Name</Typography>
      <img
        style={{
          width: "80%",
          borderRadius: '5px',
          marginBottom: '10px',
          marginTop: '10px',
          overflow: 'scroll'
        }}
        src="https://images.unsplash.com/photo-1562919479-b0c98b0d7f8e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8ZnJpZGdlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt="fridge" />
      <Box
        padding='0.5rem'
        >
        <Typography variant="body2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore consectetur omnis deserunt expedita neque, sapiente cumque officiis eligendi animi enim impedit sunt quos necessitatibus, nobis eum a excepturi tenetur. Est aperiam perferendis natus repellat expedita repudiandae error quisquam quibusdam! Veniam.
        <br></br>
        <br></br>
        Address: 
        <br></br>
        Instagram: 
        <br></br>
        Twitter: 
        </Typography>
      </Box>

    </Box>
  );
}

export default FridgePreview;