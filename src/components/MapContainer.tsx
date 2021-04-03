import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Box, Link } from '@material-ui/core';
import { useGetAllFridgesQuery } from '../generated/graphql';
interface MapContainerProps {

}

const mapStyle = {
  height: "90vh",
  width: "100%",
  borderRadius: '5px',
  marginTop: "10px"
}

const MapContainer: React.FC<MapContainerProps> = ({}) => {
  const [coordinates, setCoordinates] = useState({lat: 41.8239891, lng: -71.4128343})
  const [{data, fetching}] = useGetAllFridgesQuery();  
  const [ selected, setSelected ] = useState({} as any);
  return (
        <Box>
          <GoogleMap 
            mapContainerStyle={mapStyle}
            zoom={13}
            center={coordinates}>
            {data?.getAllFridges.map(fridge => (
              <Marker 
                position={{lat: fridge.lat, lng: fridge.lng}}
                key={fridge._id}
                onClick={() => setSelected(fridge)} />
            ))}
            { selected.lat && (
              <InfoWindow 
                position={{lat: selected.lat, lng: selected.lng}}
                onCloseClick={() => setSelected({})}>
                  <Box>
                  <h2>{selected.name}</h2>
                  <Link href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`} target='_blank'>{selected.address}</Link>
                  </Box>
              </InfoWindow>
            )}
          </GoogleMap>
        </Box>
    );
}

export default MapContainer;