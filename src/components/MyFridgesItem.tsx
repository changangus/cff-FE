import { Box, Button, Paper, Typography } from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link'
import AlertDialog from './AlertDialog';
import { useDeleteFridgeMutation } from '../generated/graphql';
interface MyFridgesItemProps {
  title: string,
  imageUrl: string,
  id: string
}

const MyFridgesItem: React.FC<MyFridgesItemProps> = ({ title, id, imageUrl }) => {
  const [, deleteFridge] = useDeleteFridgeMutation();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Paper elevation={3} style={{width: "100%"}}>
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
              <Button variant="contained" color="primary">Edit</Button>
            </NextLink>
          </Box>
          <AlertDialog 
            deleteFn={deleteFridge}
            buttonText="Delete"
            title="Are you sure you want to delete this fridge?"
            body="It will be permanently deleted if you decide to continue."
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default MyFridgesItem;