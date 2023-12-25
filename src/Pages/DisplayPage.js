import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const DisplayPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state.dataById;

  const [newData, setNewData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    // Perform submission logic here
    // For example, you can send the edited data to the backend
    console.log("Submitted data:", newData);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <h2>Displaying JSON Data</h2>
      {isEditing ? (
        <>
          <div>
            <textarea
              value={JSON.stringify(newData, null, 2)}
              onChange={(e) => setNewData(JSON.parse(e.target.value))}
              rows={30}
              cols={100}
            ></textarea>
            <br />
            <div style={{display:'flex',gap:'20px',marginTop:'10px'}}>
            <Button
              variant="outlined"
              color="success"
              className="buttonClass"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="success"
              className="buttonClass"
              onClick={handleSubmit}
            >
              Back
            </Button>
            </div>
          </div>
        </>
      ) : (
        <>
        <div style={{display:'flex',gap:'20px'}}>
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
            onClick={()=>{navigate('/')}}
          >
            Back
          </Button>
          </div>
          <pre>{JSON.stringify(newData, null, 2)}</pre>
          <br />
        </>
      )}
    </div>
  );
};

export default DisplayPage;
