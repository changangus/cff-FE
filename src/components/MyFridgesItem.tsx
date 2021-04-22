import { Box, Button, Paper, Typography } from '@material-ui/core';
import React from 'react';

interface MyFridgesItemProps {
  title: string,
  imageUrl: string,
  id: string
}

const MyFridgesItem: React.FC<MyFridgesItemProps> = ({title, id, imageUrl}) => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Paper elevation={3}>
          <Box display="flex" justifyContent="center">
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Box display="flex" justifyContent="center" mb={3}>
            <img 
              style={{width: "275px", height: "230px", padding: "5px"}}
              src={imageUrl}/>
          </Box>
          <Box display="flex" justifyContent="space-evenly" padding={2}>
            <Button variant="contained">Edit</Button>
            <Button variant="contained">Delete</Button>
          </Box>
        </Paper>
      </Box>
    );
}

export default MyFridgesItem;