import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ professorsToDisplay }) {
  const professorOptions = professorsToDisplay.map((professorData) => ({
    label: professorData.name,
  }));

  return (
    <Autocomplete
      id="combo-box-demo"
      options={professorOptions}
      getOptionLabel={(option) => option.label}
      sx={{ width: 300, marginLeft: 'auto', marginRight: '70px', marginTop: '20px' }} 
      
      renderInput={(params) => <TextField {...params} label="Professor Name" />}
    />
  );
}
