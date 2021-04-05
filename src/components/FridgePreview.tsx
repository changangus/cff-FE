import { Box, Link, Typography } from '@material-ui/core';
import React from 'react';

interface FridgePreviewProps {
  name: string,
  description: string,
  address: string,
  lat: number,
  lng: number,
  instagram?: string,
  twitter?: string
}

const FridgePreview: React.FC<FridgePreviewProps> = ({ name, description, lat, lng, address, instagram, twitter }) => {
  console.log(description)
  return (
    <Box
      fontSize={18}
      display="flex"
      flexDirection='column'
      alignItems="center"
    >
      { !name ?
        <Typography variant="h5">Click a Marker to select a Fridge!</Typography>
        :
        <Box>
          <Typography variant="h5">{name}</Typography>
          <img
            style={{
              width: "80%",
              borderRadius: '5px',
              marginBottom: '10px',
              marginTop: '10px',
              overflow: 'scroll'
            }}
            src="https://images.unsplash.com/photo-1562919479-b0c98b0d7f8e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8ZnJpZGdlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="fridge" />
          <Box
            padding='0.5rem'
          >
            <Typography variant="body2">{description}
              <br></br>
              <br></br>
              Address: <Link href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`} target='_blank'>{address}</Link>
              <br></br>
              {instagram ? `Instagram: ${instagram}` : null}
              <br></br>
              {twitter ? `Twitter: ${twitter}` : null}
            </Typography>
          </Box>
        </Box>
      }
    </Box>
  );
}

export default FridgePreview;