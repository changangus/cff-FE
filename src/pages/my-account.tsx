import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import AlertDialog from '../components/DeleteAccountAlertDialog';
import EditProfileDialog from '../components/EditProfileDialog';
import MyFridgesItem from '../components/MyFridgesItem';
import MyFridgesList from '../components/MyFridgesList';
import { useGetMyFridgesQuery, useMeQuery } from '../generated/graphql';

interface MyAccountProps {

}

const MyAccount: React.FC<MyAccountProps> = ({}) => {
  const [{data, fetching}, me] = useMeQuery();

  return (
        <div>
          <Box mt={2} mb={5} display="flex" flexDirection="column" justifyContent="space-around" alignItems="start" height="40vh">
            <Typography variant="h5">User Profile:</Typography>
            <Typography variant="body1">First Name: {data?.me?.firstName}</Typography>
            <Typography variant="body1">Last Name: {data?.me?.lastName}</Typography>
            <Typography variant="body1">Email: {data?.me?.email}</Typography>            
            <Box display="flex" justifyContent="space-between" width="30vw">
              <EditProfileDialog />
              <AlertDialog />
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