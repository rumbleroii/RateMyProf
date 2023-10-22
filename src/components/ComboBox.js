import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ professorsToDisplay, onProfessorSelect }) {
  const professorOptions = professorsToDisplay.map((professorData) => ({
    label: professorData.name,
  }));

  const [selectedProfessor, setSelectedProfessor] = React.useState(null);

  const handleProfessorChange = (event, newValue) => {
    setSelectedProfessor(newValue);
    console.log(newValue);
    onProfessorSelect(newValue);
  };

  const isOptionEqualToValue = (option, value) => {
    return option.label === value.label;
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      options={professorOptions}
      getOptionLabel={(option) => option.label}
      value={selectedProfessor}
      onChange={handleProfessorChange}
      isOptionEqualToValue={isOptionEqualToValue}
      sx={{
        width: 300,
        marginLeft: "auto",
        marginRight: "70px",
        marginTop: "20px",
      }}
      renderInput={(params) => <TextField {...params} label="Professor Name" />}
    />
  );
}
