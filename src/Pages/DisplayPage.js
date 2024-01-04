import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { WizardContext } from "../Context/WizardContext";
import PreviewForm from "./Preview";
import Paper from "@mui/material/Paper";
import axios from "axios";

const DisplayPage = () => {
  const { userId } = useParams();

  const {
    completeFormDataContext,
    setCompleteFormDataContext,
    wizardData,
    setWizardData,
    setIsValid,
  } = useContext(WizardContext);

  const navigate = useNavigate();

  //take data from state
  const location = useLocation();
  const initialData = location.state.dataById;

  console.log("initialData", initialData, "userID11111", userId);

  const handleEdit = () => {
    console.log("backend context", completeFormDataContext);
    console.log("wizard data", wizardData);
    setIsValid(true);
    navigate(`/ui/${userId}`);
  };

    const handleDelete = async (userId) => {
      try {
        const res = await axios.delete(`http://localhost:8080/deleteData/${userId}`);

        navigate("/");
      } catch (error) {
        console.error(
          `Error fetching data for ID ${userId} from the backend:`,
          error.message
        );
      }
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

  return (
    <Paper
      sx={{
        width: "95%",
        height: "95vh",
        margin: "15px auto",
        display: "flex",
      }}
      elevation={8}
    >
      {/* <div style={{ display: "flex" }}> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          maxWidth: "350px",
          padding: "0 30px",
        }}
      >
        <div style={{}}>
          <strong>Title</strong>-{initialData.title}
        </div>
        <div>
          <strong>Description</strong>-{initialData.description}
        </div>
        {/* <h6>{initialData.description}</h6> */}
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
          <Button
            variant="outlined"
            color="success"
            className="buttonClass"
            onClick={() => handleDelete(userId)}
          >
            Delete
          </Button>
        </div>

        {/* <br />
        <pre>{JSON.stringify(initialData, null, 2)}</pre>
        <br /> */}
      </div>
      <div style={{ flex: "1", height: "100%", overflowY: "scroll" }}>
        {Object.keys(completeFormDataContext).length && <PreviewForm />}
      </div>
      {/* </div> */}
    </Paper>
  );
};

export default DisplayPage;
