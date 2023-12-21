import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Navbar from "../Common/Navbar";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import {WizardContext} from "../Context/WizardContext"

const WizardCreation = () => {

  const { wizardData, setWizardData } = useContext(WizardContext)

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //const { name, value } = e.target;
    
    setWizardData({ ...wizardData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(wizardData);

    setWizardData(wizardData);

      //navigate('/ui',{ state: { formData } })
      navigate('/ui')
  };

  const handleNextClick = () => {
    console.log('Next button clicked');
    
  };


  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
           Initiate Your New Wizard
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Give Title of WizardForm"
            name="title"
            value={wizardData.title}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Give Description of WizardForm"
            name="description"
            value={wizardData.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Total Steps"
            name="totalSteps"
            value={wizardData.totalSteps}
            onChange={handleInputChange}
            margin="normal"
            type="number"
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, mr: 30 }}
          >
            Next
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
            sx={{ mt: 2 }}
          >
            Next
          </Button>
          
        </form>
      </Box>
    </>
  );
};

export default WizardCreation;
