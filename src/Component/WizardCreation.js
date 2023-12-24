import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Navbar from "../Common/Navbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { WizardContext } from "../Context/WizardContext";
import Tooltip from "@mui/material/Tooltip";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const WizardCreation = () => {
  const { wizardData, setWizardData } = useContext(WizardContext);


  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //const { name, value } = e.target;

    setWizardData({ ...wizardData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    //validation for title field
    if (!wizardData.title || wizardData.title.trim() === "") {
      newErrors.title = "Title is required";
      valid = false;
    } else if (wizardData.title.length < 10) {
      newErrors.title = "Title must be big";
      valid = false;
    }

    //validation for desc
    if (!wizardData.description || wizardData.description.trim() === "") {
      newErrors.description = "Description is required";
      valid = false;
    } else if (wizardData.description.length < 20) {
      newErrors.description = "description must be atleast 20 character";
      valid = false;
    }

    //validation for totalSteps
    if (!wizardData.totalSteps || isNaN(wizardData.totalSteps)) {
      newErrors.totalSteps = "Total steps must be a number";
      valid = false;
    }

    // console.log("valid",valid);
    // console.log(errors);
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(wizardData);
    if (validateForm()) {
      setWizardData(wizardData);
      // setTimeout(() => {
      //   navigate("/ui");
      // }, 1000);
      toast.success("Wizard creation successful!", {
        autoClose: 1000,
        onClose: () => navigate("/ui"),
      });
    }
  };

  

  return (
    <>
      <Navbar />
      <Tooltip
          describeChild
          title="This is a Wizard UI Builder where you can work with different input fields"
        >
      <Box sx={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
        
          <Typography variant="h4" gutterBottom>
            Initiate Your New Wizard
          </Typography>

          {/* <Typography variant="h4" gutterBottom>
          Initiate Your New Wizard
        </Typography> */}
          <form>
            <TextField
              fullWidth
              label="Give Title of WizardForm"
              name="title"
              value={wizardData.title}
              onChange={handleInputChange}
              margin="normal"
              required
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
            {/* <span style={{fontSize:'14px',color:'red'}}>{errors.title}</span> */}
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
              error={Boolean(errors.description)}
              helperText={errors.description}
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
              error={Boolean(errors.totalSteps)}
              helperText={errors.totalSteps}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2, paddingLeft: 22.5, paddingRight: 22.5 }}
            >
              Next
            </Button>
          </form>
        
      </Box>
      </Tooltip>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default WizardCreation;
