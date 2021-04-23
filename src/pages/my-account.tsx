import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import AlertDialog from '../components/AlertDialog';
import EditProfileDialog from '../components/EditProfileDialog';
import MyFridgesItem from '../components/MyFridgesItem';
import MyFridgesList from '../components/MyFridgesList';
import { useDeleteUserMutation, useMeQuery } from '../generated/graphql';

const MyAccount: React.FC = ({}) => {
  const [{data, fetching}, me] = useMeQuery();
  const [, deleteUser] = useDeleteUserMutation();

  return (
        <div>
          <Box mt={2} mb={5} display="flex" flexDirection="column" justifyContent="space-around" alignItems="start" height="40vh">
            <Typography variant="h5">User Profile:</Typography>
            <Typography variant="body1">First Name: {data?.me?.firstName}</Typography>
            <Typography variant="body1">Last Name: {data?.me?.lastName}</Typography>
            <Typography variant="body1">Email: {data?.me?.email}</Typography>            
            <Box display="flex" justifyContent="space-between" width="30vw">
              <EditProfileDialog />
              <AlertDialog 
                deleteFn={deleteUser}
                buttonText="Delete Account"
                title="Are you sure you want to delete your account?"
                body="All data will be deleted including any fridges you have added to our database."/>
            </Box>
          </Box>
          <Box mb={3}>
            <Typography variant="h5">Fridges Added:</Typography>
          </Box>
          <MyFridgesList />
        </div>
  );
}

export default MyAccount;