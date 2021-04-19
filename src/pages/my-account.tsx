import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import AlertDialog from '../components/AlertDialog';
import EditProfileDialog from '../components/EditProfileDialog';
import { useMeQuery } from '../generated/graphql';

interface MyAccountProps {

}

const MyAccount: React.FC<MyAccountProps> = ({}) => {
  const [{data, fetching}, me] = useMeQuery();

  return (
        <div>
          <Box mt={3} display="flex" flexDirection="column" justifyContent="space-between" alignItems="start" height="40vh">
            <Typography variant="h4">User Profile:</Typography>
            <Typography variant="body1">First Name: {data?.me?.firstName}</Typography>
            <Typography variant="body1">Last Name: {data?.me?.lastName}</Typography>
            <Typography variant="body1">Email: {data?.me?.email}</Typography>            
            <Box display="flex" justifyContent="space-between" width="30vw">
              <EditProfileDialog />
              <AlertDialog />
            </Box>
          </Box>
        </div>
  );
}

export default MyAccount;