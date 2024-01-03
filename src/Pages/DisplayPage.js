import React, { useEffect,  useContext } from "react";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { WizardContext } from "../Context/WizardContext";


const DisplayPage = () => {
  const {userId} = useParams();
  
  const {
    completeFormDataContext,
    setCompleteFormDataContext,
    wizardData,
    setWizardData
  } = useContext(WizardContext);

  const navigate = useNavigate();
  //take data from state
  const location = useLocation();
  const initialData = location.state.dataById;


  console.log("initialData", initialData);

  const handleEdit = () => {
    console.log("backend context", completeFormDataContext);
    console.log("wizard data", wizardData);
    navigate(`/ui/${userId}`);
  };

  useEffect(() => {
    console.log(typeof initialData, initialData);
    setCompleteFormDataContext(initialData.completeFormDataContext);
    // console.log("current count", currentCount);
    // console.log("selected components", selectedComponents);

    setWizardData({
      title: initialData.title,
      description: initialData.description,
      totalSteps: initialData.totalSteps,
    });
  }, []);

  // const renderDisplay = () => {
  //   return (
  //     <>
  //       <h1>Data</h1>
  //     </>
  //   );
  // };

  return (
    <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",gap: "30px"}}>
        <h2>{initialData.title}</h2>
        <h6>{initialData.description}</h6>
        <div style={{ display: "flex", gap: "20px" }}>
          <Button
            variant="outlined"
            color="success"
            className="buttonClass"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="success"
            className="buttonClass"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </div>
        
        {/* {renderDisplay()} */}
        <br />
        <pre>{JSON.stringify(initialData, null, 2)}</pre>
        <br />
    </div>
  );
};

export default DisplayPage;
