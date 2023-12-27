import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
//import Typography from '@mui/material/Typography';
//import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link,useNavigate } from "react-router-dom";
import StepTracker from "../Component/StepTracker";
import { WizardContext } from "../Context/WizardContext";
import Button from "@mui/material/Button";

const UiNavbar = () => {

  const navigate = useNavigate();

  const {
    wizardData,
    currentCount,
    setPage,
    setCurrentCount,
    page,
    selectedComponents,
    setSelectedComponents,
  } = useContext(WizardContext);

  const handleRemoveAllComponent = () => {
    if (selectedComponents.length > 0) {
      const updatedComponents = [...selectedComponents];
      updatedComponents.splice(0, selectedComponents.length);
      setSelectedComponents(updatedComponents);
    } else {
      console.log("nothing is there");
    }
  };

  const handleNextPage = () => {
    if (currentCount == wizardData.totalSteps) {
      alert("over");
    } else {
      setPage(page + 1);
      setCurrentCount(currentCount + 1);
      console.log(page);
      handleRemoveAllComponent();
    }
  };

  const handlePrevPage = () => {
    console.log("open page1 edit");
    if (currentCount > 1) {
      setCurrentCount(currentCount - 1);
      handleRemoveAllComponent();
    } else {
      alert("negative");
    }
  };

  const handlePreview = () => {
    navigate("/preview");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'#3a4664'}}>
        <Toolbar>
            <div style={{display:'flex', flexDirection:'row',justifyContent:'center',alignItems:'center', width:'13%'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            WIZARD
          </Link>
          </div>


          <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center', width:'90%',gap:20}}>
            <Button
              variant="contained"
              color="success"
              onClick={handlePrevPage}
              disabled={currentCount == 1}
              
            >
              Prev
            </Button>
            <div>
              {currentCount > 0 ? (
                <StepTracker
                  totalSteps={wizardData.totalSteps}
                  currentStep={currentCount}
                />) : ("")}
            </div>
            <Button
              variant="contained"
              color="success"
              onClick={handleNextPage}
              disabled={currentCount == wizardData.totalSteps}
            >
              Next
            </Button>
            
          </div>
          <Button
              variant="contained"
              color="success"
              onClick={handlePreview}
              disabled={currentCount < wizardData.totalSteps}
            >
              Preview
            </Button>

          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UiNavbar;
