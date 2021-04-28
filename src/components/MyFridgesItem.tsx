import { Box, Button, Paper, Typography } from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link';
import DeleteFridgeAlertDialog from '../components/DeleteFridgeAlertDialog';
interface MyFridgesItemProps {
  title: string,
  imageUrl: string,
  id: string
}

const MyFridgesItem: React.FC<MyFridgesItemProps> = ({ title, id, imageUrl }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Paper elevation={3}>
        <Box display="flex" justifyContent="center">
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" mb={3}>
          <img
            style={{ width: "275px", height: "230px", padding: "5px" }}
            src={imageUrl} />
        </Box>
        <Box display="flex" justifyContent="space-evenly" padding={2}>
          <Box display="flex" alignItems='center'>
            <NextLink href={`/edit/${id}`}>
              <Button variant="contained" color="secondary">Edit</Button>
            </NextLink>
          </Box>
          <DeleteFridgeAlertDialog id={id} />
        </Box>
      </Paper>
    </Box>
  );
}

export default MyFridgesItem;