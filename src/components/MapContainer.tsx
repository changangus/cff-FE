import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Box } from '@material-ui/core';

interface MapContainerProps {

}

const mapStyle = {
  height: "90vh",
  width: "70%",
  borderRadius: '5px',
  marginTop: "10px"
}

const MapContainer: React.FC<MapContainerProps> = ({}) => {
  const [coordinates, setCoordinates] = useState({lat: 41.8239891, lng: -71.4128343})
    return (
        <Box>
          <GoogleMap 
            mapContainerStyle={mapStyle}
            zoom={13}
            center={coordinates}>
              
          </GoogleMap>
        </Box>
    );
}

export default MapContainer;