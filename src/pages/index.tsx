import { Box, Grid } from '@material-ui/core'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import React from 'react'
import FridgePreview from '../components/FridgePreview'
import MapContainer from '../components/MapContainer'
import { createUrqlClient } from '../utils/createUrqlClient'

function Home() {
  return (
    <div>
      <Head>
        <title>Community Fridge Finder</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
        <script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCPE7ZHqAs4y-DGcd0YN8JaUPJ_XnFStrE&libraries=places`}></script>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <MapContainer />
        </Grid>
        <Grid item xs={3}>
          <Box
            mt='10px'
            border='1px solid black'
            >
            <FridgePreview />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
};

export default withUrqlClient(createUrqlClient)(Home)
