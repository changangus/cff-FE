import { Grid } from '@material-ui/core';
import React from 'react';
import { useGetMyFridgesQuery } from '../generated/graphql';
import MyFridgesItem from './MyFridgesItem';

interface MyFridgesListProps {

}

const MyFridgesList: React.FC<MyFridgesListProps> = ({ }) => {
  const [{ data, fetching }, getMyFridges] = useGetMyFridgesQuery();
  return (
    <div>
      <Grid container spacing={1}>
        {data?.getMyFridges.map(fridge => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={fridge._id}>
            <MyFridgesItem title={fridge.name} id={fridge._id as string} imageUrl={fridge.imageUrl} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MyFridgesList;