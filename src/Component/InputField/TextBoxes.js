// import React, { useContext, useEffect, useState } from "react";
// import {
//   Typography,
//   TextField,
//   Button,
//   FormControl,
//   Box,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import "../../CSS/textboxes.css";
// import { WizardContext } from "../../Context/WizardContext";

// const TextBoxes = (props) => {
//   //state to hold errors and display
//   const [errors, setErrors] = useState({});

//   //global state
//   const {
//     completeFormDataContext,
//     setCompleteFormDataContext,
//     currentCount,
//     setId,
//     id,
//     setIsValid,
//     isValid
//   } = useContext(WizardContext);

//   // useEffect(() => {
//   //   console.log(`TextBox component with ID ${props.uniqueId} is rendered.`);
//   //   console.log(props);
//   //   console.log('object',Object.keys(props).includes('question')?props.question:'');
//   // });

//   //local state
//   const [formData, setFormData] = useState({
//     page: currentCount,
//     type: "textbox",
//     question: Object.keys(props).includes("question") ? props.question : "",
//     options: Object.keys(props).includes("options") ? props.options : [],
//     //seq: globalSeq,
//     Uid: props.uniqueId,
//     answer:''
//   });

//   //validation Question
//   const validateTextForm = (e) => {
//     let textValid = true;
//     const newErrors = {};

//     if (!e.question || e.question.trim() === "") {
//       newErrors.question = "Question field can't be empty";
//       textValid = false;
//     }
//     else if (!/^[a-zA-Z]/.test(e.question)) {
//       newErrors.question = "Qusetion should start with a letter";
//       textValid = false;
//     }
//     else if (e.question[0] !== e.question[0].toUpperCase()) {
//       newErrors.question = "Question should start with uppercase character";
//       textValid = false;
//     }
//     else if(/^\d/.test(e.question)){
//       newErrors.question = "Question shout not start with a number"
//     }
//     else if (e.question.length < 10) {
//       newErrors.question = "Question must be at least of 10 character";
//       textValid = false;
//     }

//     setErrors(newErrors);
//     return textValid;
//   };

//   //validate Options
//   const validateOptionForm = (options) => {
//     let optionValid = true;
//     const newErrors = {};

//     options.forEach((option, i) => {
//       if (!option || option.trim() === "") {
//         newErrors[`option${i + 1}`] = `Option ${i + 1} can't be empty`;
//         optionValid = false;
//       }

//     });

//     setErrors((previousError) => ({ ...previousError, ...newErrors }));
//     return optionValid;
//   };

//   const handleQuestionChange = (e) => {
//     console.log("formmmmmmmmm", formData.Uid);
//     setFormData({ ...formData, question: e.target.value });
//     updateCompleteFormData(formData.Uid, {
//       ...formData,
//       question: e.target.value,
//     });

//     //call validate
//     setIsValid(validateTextForm({ question: e.target.value }));
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...formData.options];
//     updatedOptions[index] = value;
//     setFormData({ ...formData, options: updatedOptions });
//     updateCompleteFormData(formData.Uid, {
//       ...formData,
//       options: updatedOptions,
//     });

//     // console.log("option",updatedOptions);

//     //call validate
//     setIsValid(validateOptionForm(updatedOptions));
//   };

//   const addOption = () => {
//     if (formData.options.length < 4 && isValid) {
//       setFormData({ ...formData, options: [...formData.options, ""] });
//     }
//   };

//   const removeOption = (index, uid) => {
//     const updatedOptions = [...formData.options];
//     updatedOptions.splice(index, 1);
//     setFormData({ ...formData, options: updatedOptions });

//     setCompleteFormDataContext((prevContext) => {
//       const updatedContext = { ...prevContext };
//       const currentPageData = { ...updatedContext[currentCount] };

//       if (currentPageData && currentPageData[uid]) {
//         const currentPageOptions = [...currentPageData[uid].options];

//         console.log("remove option",currentPageData[uid]);
//         console.log("index",index,"uid",uid);

//         if (currentPageOptions) {
//           currentPageOptions.splice(index, 1);
//           currentPageData[uid].options = currentPageOptions;
//           updatedContext[currentCount] = currentPageData;

//           // Update the completeFormDataContext
//           return updatedContext;
//         }
//       }

//       // Return the unchanged context
//       return prevContext;
//     });
//   };

//   const updateCompleteFormData = (uid, updatedData) => {
//     setId(id + 1);
//     console.log("id", id);
//     console.log(
//       "ccccc",
//       completeFormDataContext,
//       "insert",
//       formData.page,
//       "pre",
//       uid,
//       "--",
//       updatedData
//     );
//     // if(uid && updatedData){

//     setCompleteFormDataContext((prevContext) => ({
//       ...prevContext,
//       [formData.page]: {
//         ...prevContext[formData.page],
//         [uid]: updatedData,
//       },
//     }));
//   };

//   useEffect(() => {
//     updateCompleteFormData(formData.Uid, formData);
//   }, []);

//   // const handleSubmit = (e) => {
//   //   //e.preventDefault();

//   //   setGlobalSeq(globalSeq+1);

//   //   console.log('From TextBox comp. :', formData);

//   //   //structured clone

//   //   // const textBoxUpdate = structuredClone(completeFormDataContext)
//   //   // textBoxUpdate.textBoxes.push(formData)
//   //   // console.log("texboxcontext");
//   //   // console.log(textBoxUpdate);

//   //   // setCompleteFormDataContext(textBoxUpdate);

//   //   //onRemove();

//   //   setFormData({
//   //     question: '',
//   //     options: [],
//   //   });
//   // };

//   // useEffect(()=>{

//   //   console.log("previous Uid",formData.Uid,"Page",formData.page,formData,"intial",completeFormDataContext);
//   //   setCompleteFormDataContext((prevContext)=>({...prevContext,[formData.page]:{
//   //     ...prevContext[formData.page],[formData.Uid]:formData
//   //   }}))
//   //   console.log("after cFD",completeFormDataContext);
//   //   console.log("after",formData);
//   // },[formData])

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         margin: "auto",
//         padding: "20px",
//         backgroundColor: "#F3F5F0",
//         borderRadius: "8px",
//         boxShadow: "0px 3px 6px #00000029",
//       }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Create Your Textbox Wizard
//       </Typography>
//       <form>
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <TextField
//             label="Question"
//             fullWidth
//             value={formData.question}
//             onChange={handleQuestionChange}
//             margin="normal"
//             variant="outlined"
//             required
//             sx={{ mb: 2 }}
//             error={Boolean(errors.question)}
//             helperText={errors.question}
//           />

//           {formData.options.map((option, index) => (
//             <div key={index} className="optionStyle">
//               <TextField
//                 label={`Option ${index + 1}`}
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 fullWidth
//                 required
//                 variant="outlined"
//                 sx={{ flex: 1, mr: 1 }}
//                 error={Boolean[`option${index + 1}`]}
//                 helperText={errors[`option${index + 1}`]}
//                 FormHelperTextProps={{
//                   sx: {
//                     color: 'red' // Set the color to red for error messages
//                   }
//                 }}
//               />
//               <IconButton onClick={() => removeOption(index,formData.Uid)}>
//                 <DeleteIcon />
//               </IconButton>
//             </div>
//           ))}

//           <Button
//             variant="outlined"
//             onClick={addOption}
//             disabled={formData.options.length === 4}
//             sx={{ mt: 2 }}
//             style={{ width: 150 }}
//           >
//             Add Option
//           </Button>
//         </div>
//       </form>
//     </Box>
//   );
// };

// export default TextBoxes;

import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  Modal,
} from "@mui/material";
import { WizardContext } from "../../Context/WizardContext";

const TextBoxes = (props) => {

  const [isRequired, setIsRequired] = useState(false);

  const [validationModalOpen, setValidationModalOpen] = useState(false);
  const [validationSettings, setValidationSettings] = useState({
    regexPattern: "",
    maxLength: 10,
    isRequired: false,
  });

  const [errors, setErrors] = useState({});

  // Global state,
  const {
    setIsValid,
    selectedComponents,
    completeFormDataContext,
    setId,
    id,
    setCompleteFormDataContext,
    currentCount,
  } = useContext(WizardContext);

  console.log("textBox props", props);

  // Local state
  const [formData, setFormData] = useState({
    page: currentCount,
    type: "textbox",
    question: Object.keys(props).includes("question") ? props.question : "",
    textDescription: Object.keys(props).includes("textDescription")
      ? props.textDescription
      : "",
    //options: Object.keys(props).includes('options')?props.options:[],
    Uid: props.uniqueId,
    answer: Object.keys(props).includes("answer") ? props.answer : "",
  });

  //validate question
  const validateTextboxForm = (e) => {
    let textValid = true;
    const newErrors = {};

    if (!e.question || e.question.trim() === "") {
      newErrors.question = "Question field can't be empty";
      textValid = false;
    } else if (!/^[a-zA-Z]/.test(e.question)) {
      newErrors.question = "Qusetion should start with a letter";
      textValid = false;
    } else if (e.question[0] !== e.question[0].toUpperCase()) {
      newErrors.question = "Question should start with uppercase character";
      textValid = false;
    } else if (/^\d/.test(e.question)) {
      newErrors.question = "Question shout not start with a number";
    } else if (e.question.length < 10) {
      newErrors.question = "Question must be at least of 10 character";
      textValid = false;
    }

    setErrors(newErrors);
    return textValid;
  };

  const handleQuestionChange = (e) => {
    setFormData({ ...formData, question: e.target.value });
    updateCompleteFormData(formData.Uid, {
      ...formData,
      question: e.target.value,
    });

    //validate question
    setIsValid(validateTextboxForm({ question: e.target.value }));
  };

  // const handleDescriptionChange = (e) => {
  //   setFormData({ ...formData, textDescription: e.target.value });
  //   updateCompleteFormData(formData.Uid, {
  //     ...formData,
  //     textDescription: e.target.value,
  //   });
  // };

  const handleRequiredToggle = () => {
    setIsRequired(!isRequired);

    setValidationSettings({ ...validationSettings, isRequired: !isRequired });
  };

  const handleValidationModalOpen = () => {
    setValidationModalOpen(true);
  };

  const handleValidationModalClose = () => {
    setValidationModalOpen(false);
  };

  const handleSaveValidationSettings = () => {
    updateCompleteFormData(formData.Uid, {
      ...formData,
      validationSettings: {
        ...validationSettings,
        isRequired: isRequired,
      },
    });

    setValidationModalOpen(false);
  };

  const handleValidationInputChange = (e) => {
    setValidationSettings({
      ...validationSettings,
      maxLength: e.target.value,
    });
  };

  const checkRegex = (newRegexPattern) => {
    try {
      new RegExp(newRegexPattern);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleRegexChange = (e) => {
    const newRegexPattern = e.target.value;
    let regexError = "";
    if (checkRegex(newRegexPattern)){
      console.log("iffffff");
      setValidationSettings({
        ...validationSettings,
        regexPattern: e.target.value,
      });
    }
    else{
      console.log("elseeeee");
      regexError = "Invalid regex pattern";
    }

    setErrors({ ...errors, regex: regexError });
  };

  const updateCompleteFormData = (uid, updatedData) => {
    setId(id + 1);
    console.log("id", id);
    console.log(
      "ccccc",
      completeFormDataContext,
      "insert",
      formData.page,
      "pre",
      uid,
      "--",
      updatedData
    );
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
    const allCheckBox = selectedComponents.filter(
      (element) => element.type.name === "TextBoxes"
    );
    let validationStatus = true;
    allCheckBox.forEach((checkbox) => {
      const validationValue = validateTextboxForm({
        question: checkbox.props.question,
      });
      validationStatus = validationStatus && validationValue;
      if (!validationStatus) return;
    });
    setIsValid(validationStatus);
  }, []);

  // useEffect(()=>{
  //   console.log("ssssss");
  //   console.log(formData);
  //   setCompleteFormDataContext((prevContext)=>({...prevContext,[formData.page]:{
  //     ...prevContext[formData.page],[formData.Uid]:formData
  //   }}))
  //   console.log(completeFormDataContext);
  //   console.log(formData);
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
        Create Your TextBoxes Wizard
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
            error={Boolean(errors.question)}
            helperText={errors.question}
          />
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={isRequired}
                onChange={handleRequiredToggle}
                color="primary"
              />
            }
            label="Required"
          /> */}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleValidationModalOpen}
          >
            Client Side Validation
          </Button>
        </div>
      </form>

      <Modal
        open={validationModalOpen}
        onClose={handleValidationModalClose}
        aria-labelledby="validation-modal-title"
        aria-describedby="validation-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 300, bgcolor: "background.paper", p: 3 }}>
          <h3 style={{ paddingBottom: "10px" }} id="validation-modal-title">
            Validation Settings
          </h3>
          <TextField
            label="Max Length"
            name="maxLength"
            value={validationSettings.maxLength}
            onChange={handleValidationInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Regex Pattern"
            variant="outlined"
            fullWidth
            value={validationSettings.regexPattern}
            onChange={handleRegexChange}
            sx={{ mt: 2 }}
            error={Boolean(errors.regex)}
            helperText={errors.regex}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRequired}
                onChange={handleRequiredToggle}
                color="primary"
              />
            }
            label="Required"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveValidationSettings}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TextBoxes;
