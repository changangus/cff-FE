import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Box, Grid, Link, Typography } from '@material-ui/core';
import { useGetAllFridgesQuery } from '../generated/graphql';
import FridgePreview from './FridgePreview';

const mapStyle = {
  height: "90vh",
  width: "100%",
  borderRadius: '5px',
  marginTop: "10px",
  overflow: "hidden"
}

const MapContainer: React.FC = ({ }) => {
  const [coordinates, setCoordinates] = useState({ lat: 41.8239891, lng: -71.4128343 })
  const [address, setAddress] = useState("")
  const [{ data, fetching }] = useGetAllFridgesQuery();
  const [selected, setSelected] = useState({} as any);

  const handleSelect = async(value: any) => {
    const results = await geocodeByAddress(value);
    const location = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(location)
  }

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
                position={{ lat: fridge.lat as number, lng: fridge.lng as number }}
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
          borderRadius="10px"
        >
          <PlacesAutoComplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className='searchbar-container'>
                <label htmlFor='searchbar'>Search:</label>
                <input {...getInputProps({ placeholder: 'Find Your City', className: 'searchbar', id: 'searchbar' })} />
                <div className='searchbar-suggestions'>
                  {loading && <div>...loading</div>}
                  {suggestions.map((suggestion) => {
                    const style = {
                      width: '100%',
                      zIndex: '1',
                      fontFamily: 'inherit',
                      backgroundColor: suggestion.active ? '#76ced7' : 'white',
                      fontWeight: 'bold',
                      outline: 'none',
                      cursor: 'pointer'
                    };
                    return (
                      <Box
                       {...getSuggestionItemProps(suggestion)} 
                       key={suggestion.description}
                       bgcolor={suggestion.active ? '#76ced7' : 'white'}
                       
                       >
                        <Typography variant="body2">{suggestion.description}</Typography>
                      </Box>
                    )
                  })}
                </div>
              </div>
            )}
          </PlacesAutoComplete>
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