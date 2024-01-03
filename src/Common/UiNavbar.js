import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
//import Typography from '@mui/material/Typography';
//import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link,useNavigate,useParams } from "react-router-dom";
import StepTracker from "../Component/StepTracker";
import { WizardContext } from "../Context/WizardContext";
import Button from "@mui/material/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UiNavbar = () => {

  const {userId} = useParams();
  const navigate = useNavigate();

  const {
    isValid,
    wizardData,
    currentCount,
    setPage,
    setCurrentCount,
    page,
    selectedComponents,
    setSelectedComponents,
    completeFormDataContext
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
  // if (isValid) {
  //   toast.success("Ready to go Next Page", {
  //     autoClose: 500,
  //     onClose: () => {
  //       setPage(page + 1);
  //       setCurrentCount(currentCount + 1);
  //       handleRemoveAllComponent();
  //     },
  //   });
  // } else {
  //   console.log("validate karo");
  //   toast.warning("Give proper Validation!!!", {
  //     autoClose: 1000,
  //   });
  // }
  const handleNextPage = () => {
    
    if (currentCount == wizardData.totalSteps) {
      alert("over");
    } 
    else if (isValid) {
      toast.success("Ready to go Next Page", {
        autoClose: 500,
        onClose: () => {
          setPage(page + 1);
          setCurrentCount(currentCount + 1);
          handleRemoveAllComponent();
        },
      });
    } else {
      console.log("validate karo");
      toast.warning("Give proper Validation!!!", {
        autoClose: 1000,
      });
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

  // const handlePreview = () => {
  //   navigate(`/preview/${5}`);
  // };
  const handlePreview = () => {
    const combinedObject = { ...wizardData, completeFormDataContext };
    console.log("final data for backend");
    console.log(combinedObject);
    
    //old data
      if(userId){
        
        // axios.post(`http://localhost:8080/saveData/${userId}`,combinedObject,{
        //   headers: {
        //     "Content-Type":"application/json",
        //   }
        // })
        // .then((res)=>{
        //   console.log(`Data is sent to the backend with id ${userId} `,res.data);
        //   const finalData = res.data;
        //   console.log("USERRRidddddddddddd",finalData.id);
          navigate(`/preview/${userId}`)
        // })
        // .catch((error)=>{
        //   console.error("Error sending data to the backend:", error.message);
        // })
      }
    

      //new data
      else{
          axios.post("http://localhost:8080/saveData", combinedObject, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
                      console.log("Data sent to the backend successfully:", response.data);
                      const finalData = response.data;
                      console.log("idddddddddddd",finalData.id);
                      navigate(`/preview/${finalData.id}`)
              // navigate("/");
              alert("Data is send to backend, you can preview now")
            })
            .catch((error) => {
              console.error("Error sending data to the backend:", error.message);
            });
    }

    // navigate('/')
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
