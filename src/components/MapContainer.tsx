import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Box, Grid, Link } from '@material-ui/core';
import { useGetAllFridgesQuery } from '../generated/graphql';
import FridgePreview from './FridgePreview';
interface MapContainerProps {

}

const mapStyle = {
  height: "90vh",
  width: "100%",
  borderRadius: '5px',
  marginTop: "10px"
}

const MapContainer: React.FC<MapContainerProps> = ({ }) => {
  const [coordinates, setCoordinates] = useState({ lat: 41.8239891, lng: -71.4128343 })
  const [{ data, fetching }] = useGetAllFridgesQuery();
  const [selected, setSelected] = useState({} as any);
  
  return (

    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Box>
          <GoogleMap
            mapContainerStyle={mapStyle}
            zoom={13}
            center={coordinates}>
            {data?.getAllFridges.map(fridge => (
              <Marker
                position={{ lat: fridge.lat, lng: fridge.lng }}
                key={fridge._id}
                onClick={() => {
                  setSelected(fridge)
                  console.log(fridge)
                }} />
            ))}
            {selected.lat && (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => setSelected({})}>
                <Box>
                  <h2>{selected.name}</h2>
                  <Link href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`} target='_blank'>{selected.address}</Link>
                </Box>
              </InfoWindow>
            )}
          </GoogleMap>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box
          mt='10px'
          height='89vh'
          overflow='scroll'
          borderRadius="10px"
          boxShadow="5px 5px 5px rgba(68, 68, 68, 0.6)"
        >
          <FridgePreview 
            name={selected.name} 
            description={selected.description}
            address={selected.address}
            lat={selected.lat}
            lng={selected.lng} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default MapContainer;