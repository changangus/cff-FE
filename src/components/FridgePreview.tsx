import { Box } from '@material-ui/core';
import React from 'react';

interface FridgePreviewProps {

}

const FridgePreview: React.FC<FridgePreviewProps> = ({}) => {
    return (
        <Box
          fontSize={18}
        >
          <h1>HELLO</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore consectetur omnis deserunt expedita neque, sapiente cumque officiis eligendi animi enim impedit sunt quos necessitatibus, nobis eum a excepturi tenetur. Est aperiam perferendis natus repellat expedita repudiandae error quisquam quibusdam! Veniam.</p>
        </Box>
    );
}

export default FridgePreview;