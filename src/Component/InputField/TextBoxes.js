import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../CSS/textboxes.css";
import { WizardContext } from "../../Context/WizardContext";

const TextBoxes = (props) => {
  //global state
  const {
    completeFormDataContext,
    setCompleteFormDataContext,
    currentCount,
    setId,
    id,
  } = useContext(WizardContext);

  // useEffect(() => {
  //   console.log(`TextBox component with ID ${props.uniqueId} is rendered.`);
  //   console.log(props);
  //   console.log('object',Object.keys(props).includes('question')?props.question:'');
  // });

  //local state
  const [formData, setFormData] = useState({
    page: currentCount,
    type: "textbox",
    question: Object.keys(props).includes("question") ? props.question : "",
    options: Object.keys(props).includes("options") ? props.options : [],
    //seq: globalSeq,
    Uid: props.uniqueId,
  });

  const handleQuestionChange = (e) => {
    console.log("formmmmmmmmm", formData.Uid);
    setFormData({ ...formData, question: e.target.value });
    updateCompleteFormData(formData.Uid, {
      ...formData,
      question: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
    updateCompleteFormData(formData.Uid, {
      ...formData,
      options: updatedOptions,
    });
  };

  const addOption = () => {
    if (formData.options.length < 4) {
      setFormData({ ...formData, options: [...formData.options, ""] });
    }
  };

  const removeOption = (index) => {
    const updatedOptions = [...formData.options];
    updatedOptions.splice(index, 1);
    setFormData({ ...formData, options: updatedOptions });
  };

  const updateCompleteFormData = (uid, updatedData) => {
    setId(id + 1);
    console.log("id", id);
    console.log("ccccc",completeFormDataContext,"insert",formData.page,"pre",uid,"--",updatedData);
    // if(uid && updatedData){
      
    setCompleteFormDataContext((prevContext) => ({
      ...prevContext,
      [formData.page]: {
        ...prevContext[formData.page],
        [uid]: updatedData,
      },
    }));
  };

  useEffect(() => {
    updateCompleteFormData(formData.Uid, formData);
  }, []);

  // const handleSubmit = (e) => {
  //   //e.preventDefault();

  //   setGlobalSeq(globalSeq+1);

  //   console.log('From TextBox comp. :', formData);

  //   //structured clone

  //   // const textBoxUpdate = structuredClone(completeFormDataContext)
  //   // textBoxUpdate.textBoxes.push(formData)
  //   // console.log("texboxcontext");
  //   // console.log(textBoxUpdate);

  //   // setCompleteFormDataContext(textBoxUpdate);

  //   //onRemove();

  //   setFormData({
  //     question: '',
  //     options: [],
  //   });
  // };

  // useEffect(()=>{

  //   console.log("previous Uid",formData.Uid,"Page",formData.page,formData,"intial",completeFormDataContext);
  //   setCompleteFormDataContext((prevContext)=>({...prevContext,[formData.page]:{
  //     ...prevContext[formData.page],[formData.Uid]:formData
  //   }}))
  //   console.log("after cFD",completeFormDataContext);
  //   console.log("after",formData);
  // },[formData])

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: "20px",
        backgroundColor: "#F3F5F0",
        borderRadius: "8px",
        boxShadow: "0px 3px 6px #00000029",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create Your Textbox Wizard
      </Typography>
      <form>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Question"
            fullWidth
            value={formData.question}
            onChange={handleQuestionChange}
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          {formData.options.map((option, index) => (
            <div key={index} className="optionStyle">
              <TextField
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ flex: 1, mr: 1 }}
              />
              <IconButton onClick={() => removeOption(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button
            variant="outlined"
            onClick={addOption}
            disabled={formData.options.length === 4}
            sx={{ mt: 2 }}
            style={{ width: 150 }}
          >
            Add Option
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default TextBoxes;
