
// import React, { useState } from 'react';

// const TextBoxes = () => {
//   const [question, setQuestion] = useState('');
//   const [options, setOptions] = useState([]);
//   const [selectedAnswer, setSelectedAnswer] = useState('');

//   const handleQuestionChange = (e) => {
//     setQuestion(e.target.value);
//   };

//   const handleOptionChange = (e, index) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = e.target.value;
//     setOptions(updatedOptions);
//   };

//   const handleAnswerChange = (e) => {
//     setSelectedAnswer(e.target.value);
//   };

//   const addOption = () => {
//     if (options.length < 4) {
//       setOptions([...options, '']);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     console.log('Submitted:', { question, options, selectedAnswer });
    
//     setQuestion('');
//     setOptions([]);
//     setSelectedAnswer('');
//   };

//   return (
//     <div className=''>
//       <h2>TextBox Wizard Form</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Question:
//           <input type="text" value={question} onChange={handleQuestionChange} />
//         </label>
//         <br />
//         <br />
//         <label>
//           Options:
//           {options.map((option, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 value={option}
//                 onChange={(e) => handleOptionChange(e, index)}
//               />
//             </div>
//           ))}
//           <button type="button" onClick={addOption}>Add Option</button>
//         </label>
//         <br />
//         <br />
//         {/* <label>
//           Select Correct Answer:
//           <select value={selectedAnswer} onChange={handleAnswerChange}>
//             <option value="">Select Answer</option>
//             {options.map((option, index) => (
//               <option key={index} value={option}>{option}</option>
//             ))}
//           </select>
//         </label> */}
//         <br />
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// }

// export default TextBoxes




// import React, { useState } from 'react';
// import { Typography, TextField, Button, FormControl, Box, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import '../../CSS/textboxes.css';

// const TextBoxes = () => {
//   const [question, setQuestion] = useState('');
//   const [options, setOptions] = useState([]);

//   const handleQuestionChange = (e) => {
//     setQuestion(e.target.value);
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setOptions(updatedOptions);
//   };

//   const addOption = () => {
//     if (options.length < 4) {
//       setOptions([...options, '']);
//     }
//   };

//   const removeOption = (index) => {
//     const updatedOptions = [...options];
//     updatedOptions.splice(index, 1);
//     setOptions(updatedOptions);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     console.log('Submitted:', { question, options });
   
//     setQuestion('');
//     setOptions([]);
//   };

//   return (
//     <Box sx={{ maxWidth: 600, margin: 'auto', padding: '20px', backgroundColor: '#F3F5F0', borderRadius: '8px', boxShadow: '0px 3px 6px #00000029' }}>
//       <Typography variant="h5" gutterBottom>
//         Create Your Textbox Wizard
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <div style={{display:'flex',flexDirection:'row',justifyContent:'center', alignItems:'center',height:'70px',gap:'10px'}}>
//           <TextField
//             label="Question"
//             fullWidth
//             value={question}
//             onChange={handleQuestionChange}
//             margin="normal"
//             variant="outlined"
//             sx={{ mb: 2 }}
//           />
//           <Button variant="contained" color="primary" type="submit" sx={{ display: 'flex', height: '53px'}}>
//             Submit
//           </Button>
//         </div>

//         <FormControl component="fieldset" sx={{ mb: 4, mt: 2 }}>
//           {options.map((option, index) => (
//             <div key={index} style={{display:'flex',flexDirection:'row',justifyContent:'center', alignItems:'center',marginBottom:'8px',backgroundColor:'#ffffff',boxShadow:'0px 3px 6px #00000029',borderRadius:'8px',padding:'8px'}}>
//               <TextField
//                 label={`Option ${index + 1}`}
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 fullWidth
//                 variant="outlined"
//                 sx={{ flex: 1, mr: 1 }}
//               />
//               <IconButton onClick={() => removeOption(index)}>
//                 <DeleteIcon />
//               </IconButton>
//             </div>
//           ))}
//           <Button
//             variant="contained"
//             onClick={addOption}
//             disabled={options.length === 4}
//             sx={{ mt: 2 }}
//           >
//             Add Option
//           </Button>
//         </FormControl>
//       </form>
//     </Box>
//   );
// };

// export default TextBoxes;


// import '../CSS/user_form.css';
// import React, { useContext } from 'react';
// import { Button, Typography, FormControl, Select, MenuItem, InputLabel,Paper  } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { WizardContext } from '../Context/WizardContext';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const PreviewForm = () => {
//   const { userId } = useParams();
//   const { wizardData, completeFormDataContext, setCompleteFormDataContext } = useContext(WizardContext);
//   const navigate = useNavigate();

//   const handleOptionChange = (questionId, value, page) => {
//     setCompleteFormDataContext((prevFormData) => {
//       const updatedFormData = { ...prevFormData };
//       updatedFormData[page][questionId].answer = value;
//       return updatedFormData;
//     });
//   };

//   const handleSubmit = () => {
//     const combinedObject = { ...wizardData, completeFormDataContext };
//     axios
//       .post(`http://localhost:8080/saveData/${userId}`, combinedObject, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       .then((response) => {
//         console.log('Data sent to the backend successfully with answer', response.data);
//         navigate('/');
//       })
//       .catch((error) => {
//         console.log('Error sending data to the backend', error.message);
//       });
//   };

//   const handleBack = () => {
//     navigate(`/ui/${userId}`);
//   };

//   const renderQuestion = (questionId, questionData, page) => {
//     if (!questionData || !Array.isArray(questionData.options)) {
//       return null;
//     }
//     const { question, options } = questionData;

//     return (
      
//       <div key={questionId}>
//         <Typography variant="body1" gutterBottom>
//           {question}
//         </Typography>
//         <FormControl fullWidth>
//           <InputLabel id={`dropdown-label-${questionId}`}>Select an option</InputLabel>
//           <Select
//             labelId={`dropdown-label-${questionId}`}
//             id={`dropdown-${questionId}`}
//             value={completeFormDataContext[page][questionId]?.answer || ''}
//             label={`Select an option for ${question}`}
//             onChange={(e) => handleOptionChange(questionId, e.target.value, page)}
//           >
//             {options.map((option, index) => (
//               <MenuItem key={index} value={option}>
//                 {option}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </div>
//     );
//   };

//   return (
    
//     <div className="submit">
//       <div className="user_form">
      
//         <div className="user_form_section">
//         <Paper elevation={10}>
//           <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>{wizardData.title}</div>
        
//           {Object.keys(completeFormDataContext).map((page) => {
//             const questions = Object.keys(completeFormDataContext[page]);
//             if (questions.length === 0) {
//               return null; // if no questions, don't render
//             }

//             return (
//               <div key={`page-${page}`} className="user_form_questions">
//                 {questions.map((questionId) => (
//                   <div key={`question-${questionId}`}>
//                     {renderQuestion(questionId, completeFormDataContext[page][questionId], page)}
//                   </div>
//                 ))}
//               </div>
//             );
//           })}
//           </Paper>

//           <div className="user_form_submit">
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Submit
//             </Button>
//             <Button variant="contained" color="primary" onClick={handleBack}>
//               Back
//             </Button>
//           </div>
//         </div>
        
//       </div>
//     </div>
    
//   );
// };

// export default PreviewForm;






//all working code

// import "../CSS/user_form.css";
// import React, { useContext, useEffect, useState } from "react";
// import {
//   Button,
//   Typography,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
//   Paper,
//   Checkbox,
//   FormGroup,
//   FormControlLabel,
//   RadioGroup,
//   Radio,
//   ListItemText,
//   TextField,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { WizardContext } from "../Context/WizardContext";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";

// const PreviewForm = () => {
//   const {
//     wizardData,
//     completeFormDataContext,
//     setCompleteFormDataContext,
//     userNAME,
//   } = useContext(WizardContext);

//   const [fieldsCompleted, setFieldsCompleted] = useState(false);
//   const [userName, setUserName] = useState(userNAME || "");
//   const [currentPage, setCurrentPage] = useState(0);

//   //store all errors
//   const [fieldErrors, setFieldErrors] = useState({});

  
//   const [fieldValidations, setFieldValidations] = useState({});

//   const [userNameError, setUserNameError] = useState("");

//   //check if errors available
//   const hasFieldErrors = Object.keys(fieldErrors).length > 0;


  

//   const [showModal, setShowModal] = useState(false);
//   const [apiEndpoint, setApiEndpoint] = useState("null");

//   const { userId } = useParams();
//   console.log("preview user id", userId);

//   const navigate = useNavigate();

//   const checkFieldsCompletion = (formData) => {
//     let allFieldsFilled = true;
//     Object.keys(formData).forEach((page) => {
//       Object.keys(formData[page]).forEach((questionId) => {
//         const answer = formData[page][questionId]?.answer;
//         const isRequired = formData[page][questionId]?.validationSettings?.isRequired;
  
//         // Exclude non-required fields from the check
//         if (isRequired && (!answer || (Array.isArray(answer) && answer.length === 0))) {
//           allFieldsFilled = false;
//         }
//       });
//     });
//     setFieldsCompleted(allFieldsFilled);
//   };
  

  
// //handle option change
//   const handleOptionChange = (questionId, value, page, validateSettings) => {

//     let errorMessage = "";
// console.log("handleOptionChange",validateSettings,"questionid",questionId,"page",page);


//     const { maxLength, regexPattern,isRequired  } = validateSettings || {};

//     // console.log("handleOptionChangefdghjhgh", value.length, "maxlength", maxLength,"isrequired",isRequired);
//     let isValid = true;

//     if (isRequired) {
//       if (!value || (Array.isArray(value) && value.length === 0)) {
//         errorMessage = "This field is required";
//         isValid = false;
//       }
//     }
  
//     //check for length
//     if (value.length > maxLength) {
//       errorMessage = `Maximum length exceeded (${maxLength} characters allowed)`;
//       console.log("value.length");
//       isValid = false;
//     }

//     if (regexPattern) {
//       // console.log();
//       const regex = new RegExp(regexPattern);
//       if (!regex.test(value)) {
//         errorMessage = `Give valid regexPattern of ${regexPattern}`;
//         isValid = false;
//       }
//     }
  
//     //errors stored
//     setFieldValidations((prevValidations) => ({
//       ...prevValidations,
//       [`${page}_${questionId}`]: isValid,
//     }));

//     setFieldErrors((prevErrors) => ({
//       ...prevErrors,
//       [`${page}_${questionId}`]: errorMessage,
//     }));
//     console.log("fieldValidation", fieldValidations);

//     setCompleteFormDataContext((prevFormData) => {
//       const updatedFormData = { ...prevFormData };
//       if (!updatedFormData[page]) {
//         updatedFormData[page] = {};
//       }
//       updatedFormData[page][questionId] = {
//         ...updatedFormData[page][questionId],
//         answer: value,
//       };
//       checkFieldsCompletion(updatedFormData);
//       return updatedFormData;
//     });
//   };

//   const hasFalseValue = Object.values(fieldValidations).includes(false);

//   // const areAllFieldsValid = () => {
//   //   const allFields = Object.values(fieldValidations);
//   //   return !allFields.includes(false);
//   // };
//   const areAllFieldsValid = () => {
//     // Check the validity of each field individually
//     return Object.values(fieldValidations).every((isValid) => isValid);
//   };
//   // const isAnyFieldFilled = () => {
//   //   const fieldValues = Object.values(completeFormDataContext).flatMap(
//   //     Object.values
//   //   );
//   //   return fieldValues.some(
//   //     (field) => field?.answer !== undefined && field.answer !== ""
//   //   );
//   // };

//   let typingTimeout;

//   const handleUserNameChange = async (e) => {
//     setUserName(e.target.value);
//     // Clear the previous timeout
//     if (typingTimeout) {
//       clearTimeout(typingTimeout);
//     }

//     // Set a new timeout
//     typingTimeout = setTimeout(async () => {
//       try {
//         const resUser = await axios.post(
//           `http://localhost:8080/checkUserRes/${userId}/${e.target.value}`
//         );

//         if (resUser.data === "user found") {
//           setUserNameError("Username already exits.Please give another.");
//         } else {
//           setUserNameError("");
//         }
//         // console.log("response user name", resUser.data);
//       } catch (error) {}
//     }, 800);

//     console.log("userName", userName);
//   };

//   // const handleEmailChange = (e) => {
//   //   const newEmail = e.target.value;
//   //   setEmail(newEmail);

//   //   // Perform email validation
//   //   const emailRegex = /^[a-zA-Z0-9._-]+@[gmail]+\.[com]{3}$/ ;
//   //   const isValidEmail = emailRegex.test(newEmail);

//   //   if (!isValidEmail) {
//   //     setEmailError('Please enter a valid email address.');
//   //   } else {
//   //     setEmailError('');
//   //   }
//   // };
//   // const handleDescriptionChange = (questionId, value, page) => {
//   //   setCompleteFormDataContext((prevFormData) => {
//   //     const updatedFormData = { ...prevFormData };
//   //     if (!updatedFormData[page]) {
//   //       updatedFormData[page] = {};
//   //     }
//   //     updatedFormData[page][questionId] = {
//   //       ...updatedFormData[page][questionId],
//   //       textDescription: value,
//   //     };
//   //     return updatedFormData;
//   //   });
//   // };

//   const handleSubmit = () => {
//     setShowModal(true); 

//     // const combinedObject = { ...wizardData, completeFormDataContext };
//     // axios
//     //   .post(`http://localhost:8080/saveData/${userId}`, combinedObject, {
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //   })
//     //   .then((response) => {
//     //     console.log(
//     //       "Data sent to the backend successfully with answer",
//     //       response.data
//     //     );
//     //     navigate("/");
//     //   })
//     //   .catch((error) => {
//     //     console.log("Error sending data to the backend", error.message);
//     //   });

//     // axios
//     //   .post(
//     //     `http://localhost:8080/saveUserRes/${userId}/${userName}`,
//     //     combinedObject,
//     //     {
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //       },
//     //     }
//     //   )
//     //   .then((response) => {
//     //     console.log(
//     //       "Data sent to the backend successfully with answer",
//     //       response.data
//     //     );
//     //     navigate("/");
//     //   })
//     //   .catch((error) => {
//     //     console.log("Error sending data to the backend", error.message);
//     //   });
//   };

//   const handleSubmission = () => {
    
//     if (apiEndpoint.trim() !== "") {
//       const combinedObject = { ...wizardData, completeFormDataContext };

//       //save whole data with id
//     axios.post(`http://localhost:8080/saveData/${userId}`, combinedObject, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log(
//           "Data sent to the backend successfully with answer",
//           response.data
//         );
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log("Error sending data to the backend", error.message);
//       });

//       //save res of perticular user with id
//     axios.post(`http://localhost:8080/saveUserRes/${userId}/${userName}`,combinedObject,{
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         console.log("Data sent to the backend successfully with answer",response.data);
//         alert(response.data)
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log("Error sending data to the backend", error.message);
//         alert(error.message)
//       });

//       //save res to a particular API
//       axios.post(`${apiEndpoint}`,combinedObject,{
//         headers:{
//           "Content-Type":"application/json",
//         },
//       })
//       .then((res)=>{
//         console.log("Data sent to the backend successfully with answer",res.data);
//       })
//       .catch((e)=>{
//         console.log("Error sending data to the backend", e.message);
//       })
//       console.log("Chosen API Endpoint:", apiEndpoint);
//       setShowModal(false);
//     } else {
//       alert("Endpoint cannot be empty");
//     }
//   };

//   const handleBack = () => {
//     navigate(`/ui/${userId}`);
//   };

//   //render question----------
//   const renderQuestion = (questionId,questionData,page,questionNo,validateSettings) => {

//     // console.log("validate settinf", validateSettings);
//     // console.log("here");
//     if (
//       !completeFormDataContext ||
//       !completeFormDataContext[page] ||
//       !questionData ||
//       // !completeFormDataContext[validateSettings]||
//       (questionData.type !== "textarea" && questionData.type !== "textbox" && !Array.isArray(questionData.options))) {
//       return null;
//     }
//     const { type, question, options } = questionData;

//     const isRequired = validateSettings?.isRequired;

//     const questionLabel = isRequired ? `${question} *` : question;

//     const handleInputChange = (value) => {
//       handleOptionChange(questionId, value, page);
//     };

//     console.log("questionnumber", questionNo);

//     switch (type) {
//       case "textbox":
//         return (
//           <div key={questionId} style={{ marginBottom: "20px" }}>
//             <div style={{ display: "flex", gap: "5px" }}>
//               <Typography>{questionNo + "."}</Typography>
//               <Typography variant="body1" gutterBottom>
//                 {questionLabel}
//                 {/* {question} {questionData.isRequired && "*"} */}
//               </Typography>
//               {/* <Typography variant="body1" gutterBottom>
//                 {question}
//               </Typography> */}
//             </div>
//             {console.log(
//               "textFiled se pehle",
//               completeFormDataContext[page][questionId]
//             )}
//             <TextField
//               fullWidth
//               variant="outlined"
//               value={completeFormDataContext[page][questionId]?.answer || ""}
//               onChange={(e) =>
//                 handleOptionChange(
//                   questionId,
//                   e.target.value,
//                   page,
//                   validateSettings
//                 )
//               }

//               error={fieldErrors[`${page}_${questionId}`] !== ""}
//               helperText={fieldErrors[`${page}_${questionId}`]}
              
//             />
//           </div>
//         );
//       case "textarea":
//         return (
//           <div key={questionId} style={{ marginBottom: "20px" }}>
//             <div style={{ display: "flex", gap: "5px" }}>
//               <Typography>{questionNo + "."}</Typography>
//               <Typography variant="body1" gutterBottom>
//               {questionLabel}
//                 {/* {question} */}
//               </Typography>
//             </div>
//             <TextField
//               label="Text Description"
//               fullWidth
//               multiline
//               rows={4}
//               value={completeFormDataContext[page][questionId]?.answer || ""}
//               onChange={(e) => {
//                 handleOptionChange(questionId, e.target.value, page,validateSettings);
//               }}
//               sx={{ mb: 2, marginTop: "10px" }}
//               error={fieldErrors[`${page}_${questionId}`] !== ""}
//               helperText={fieldErrors[`${page}_${questionId}`]}
//             />
//           </div>
//         );

//       // case "textarea":
//       // return (
//       //   <div key={questionId} style={{ marginBottom: "20px" }}>
//       //     <div style={{display:'flex',gap:'5px'}}>
//       //     <Typography>
//       //       {questionNo+"."}
//       //     </Typography>
//       //     <Typography variant="body1" gutterBottom>
//       //       {question}
//       //     </Typography>
//       //     </div>
//       //     <TextField
//       //       label="Text Description"
//       //       fullWidth
//       //       multiline
//       //       rows={4}
//       //       value={
//       //         completeFormDataContext[page][questionId]?.textDescription || ""
//       //       }
//       //       onChange={(e) => {
//       //         handleDescriptionChange(questionId, e.target.value, page);
//       //       }}
//       //       sx={{ mb: 2,marginTop:'10px' }}
//       //     />
//       //   </div>
//       // );

//       case "dropdown":
//         return (
//           <div key={questionId} style={{ marginBottom: "20px" }}>
//             <div style={{ display: "flex", gap: "5px" }}>
//               <Typography>{questionNo + "."}</Typography>
//               <Typography variant="body1" gutterBottom>
//                 {question}
//               </Typography>
//             </div>
//             <FormControl fullWidth sx={{ marginTop: "10px" }}>
//               <InputLabel id={`dropdown-label-${questionId}`}>
//                 Select an option
//               </InputLabel>
//               <Select
//                 labelId={`dropdown-label-${questionId}`}
//                 id={`dropdown-${questionId}`}
//                 value={completeFormDataContext[page][questionId]?.answer || ""}
//                 label={`Select an option for ${question}`}
//                 onChange={(e) =>
//                   handleOptionChange(questionId, e.target.value, page)
//                 }
//               >
//                 {options.map((option, index) => (
//                   <MenuItem key={index} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//         );

//         case "checkbox":
//           return (
//             <div key={questionId} style={{ marginBottom: "20px" }}>
//               <div style={{ display: "flex", gap: "5px" }}>
//                 <Typography>{questionNo + "."}</Typography>
//                 <Typography variant="body1" gutterBottom>
//                   {question}
//                 </Typography>
//                 {validateSettings?.isRequired && (
//                   <span style={{ color: "red" }}>*</span>
//                 )}
//               </div>
//               <FormGroup>
//                 {options.map((option, index) => {
//                   const isChecked =
//                     completeFormDataContext[page][questionId]?.answer === option;
//                   return (
//                     <FormControlLabel
//                       key={index}
//                       control={
//                         <Checkbox
//                           checked={isChecked}
//                           onChange={(e) => {
//                             const checkedOption = e.target.checked ? option : "";
//                             handleInputChange(checkedOption);
//                           }}
//                           name={option}
//                         />
//                       }
//                       label={option}
//                     />
//                   );
//                 })}
//               </FormGroup>
//               {validateSettings?.isRequired &&
//                 !options.some(
//                   (option) =>
//                     completeFormDataContext[page][questionId]?.answer === option
//                 ) && (
//                   <div style={{ color: "red", marginTop: "3px",fontSize:'13px' }}>
//                     This field is required.
//                   </div>
//                 )}
//             </div>
//           );
        

//       case "radio":
//         return (
//           <div key={questionId} style={{ marginBottom: "20px" }}>
//             <div style={{ display: "flex", gap: "5px" }}>
//               <Typography>{questionNo + "."}</Typography>
//               <Typography variant="body1" gutterBottom>
//                 {question}
//               </Typography>
//             </div>
//             <RadioGroup
//               value={completeFormDataContext[page][questionId]?.answer || ""}
//               onChange={(e) =>
//                 handleOptionChange(questionId, e.target.value, page)
//               }
//             >
//               {options.map((option, index) => (
//                 <FormControlLabel
//                   key={index}
//                   value={option}
//                   control={<Radio />}
//                   label={option}
//                 />
//               ))}
//             </RadioGroup>
//           </div>
//         );

//       case "mcq":
//         return (
//           <div key={questionId} style={{ marginBottom: "20px" }}>
//             <div style={{ display: "flex", gap: "5px" }}>
//               <Typography>{questionNo + "."}</Typography>
//               <Typography variant="body1" gutterBottom>
//                 {question}
//               </Typography>
//             </div>
//             <FormControl fullWidth sx={{ marginTop: "10px" }}>
//               <InputLabel id={`multiselect-label-${questionId}`}>
//                 Select multiple options
//               </InputLabel>
//               <Select
//                 labelId={`multiselect-label-${questionId}`}
//                 id={`multiselect-${questionId}`}
//                 multiple
//                 value={completeFormDataContext[page][questionId]?.answer || []}
//                 onChange={(e) =>
//                   handleOptionChange(questionId, e.target.value, page)
//                 }
//                 renderValue={(selected) => selected.join(", ")}
//               >
//                 {options.map((option, index) => (
//                   <MenuItem key={index} value={option}>
//                     <Checkbox
//                       checked={
//                         completeFormDataContext[page][
//                           questionId
//                         ]?.answer?.indexOf(option) > -1
//                       }
//                     />
//                     <ListItemText primary={option} />
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//         );

//       default:
//         return null;
//     }
//     // setQuestionCount(questionNo);
//   };

//   const arrayOfPages = Object.keys(completeFormDataContext).map((page) =>
//     parseInt(page, 10)
//   );

//   const getNextPage = (current) => {
//     const nextPage = arrayOfPages.find((page) => page > current);
//     return nextPage;
//   };

//   const getPreviousPage = (current) => {
//     const previousPage = arrayOfPages.reverse().find((page) => page < current);
//     return previousPage;
//   };

//   const handleNextPage = () => {
//     const nextPage = getNextPage(currentPage);
//     setCurrentPage(nextPage);
//   };

//   const handlePreviousPage = () => {
//     const previousPage = getPreviousPage(currentPage);
//     setCurrentPage(previousPage);
//   };

//   console.log("preview cfdc", completeFormDataContext);

//   const handlePrevDisable = () => {
//     return currentPage === arrayOfPages[0];
//   };

//   const handleNextDisable = () => {
//     console.log("isAPANkJ areAllFieldsValid",areAllFieldsValid);
//     console.log("pankaj  hasfieldValue",hasFalseValue);
//     return currentPage === arrayOfPages[arrayOfPages.length - 1];
//   };
  

//   // const renderUserNamePage = () => {
//   //   if (currentPage !== 1) {
//   //     return null;
//   //   }

//   //render Page 0-------------
//   const renderUserNamePage = () => {
//     if (currentPage !== 0) {
//       return null;
//     }

//     return (
//       <Paper elevation={8}>
//         <div className="user_form_questions">
//           <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
//             {"PAGE " + currentPage}
//           </div>

//           <div key="question-userName">
//             <div>
//               <Typography variant="body1" gutterBottom>
//                 Enter Your Name:
//               </Typography>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 value={userName}
//                 onChange={handleUserNameChange}
//               />
//               {userNameError && (
//                 <div
//                   style={{ color: "red", marginTop: "2px", fontSize: "15px" }}
//                 >
//                   {userNameError}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* <div key="question-email">
//             <div>
//               <Typography variant="body1" gutterBottom>
//                 Enter Your Email:
//               </Typography>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 value={email}
//                 onChange={handleEmailChange}
//               />
//               {emailError && (
//                 <div
//                   style={{ color: "red", marginTop: "2px", fontSize: "15px" }}
//                 >
//                   {emailError}
//                 </div>
//               )}
//             </div>
//           </div> */}

//           <div style={{ marginTop: "20px" }}>
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={handleNextPage}
//               disabled={!userName || !!userNameError}
//               // disabled={!isPage0Valid()}
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       </Paper>
//     );
//   };

//   // useEffect(()=>{
//   //   console.log("useCurrentpage",currentPage);
//   //   console.log("array",arrayOfPages[arrayOfPages.length-1]);
//   //   console.log(currentPage ===  arrayOfPages[arrayOfPages.length-1]);
//   //   console.log("firsttttt",arrayOfPages[0]);
//   // },[currentPage])

//   useEffect(() => {
//     //validationon initial load
//     const initialFieldErrors = {};
  
//     // Loop through existing data to get initial errors
//     Object.keys(completeFormDataContext).forEach((page) => {
//       Object.keys(completeFormDataContext[page]).forEach((questionId) => {
//         const answer = completeFormDataContext[page][questionId]?.answer || '';
//         const validateSettings = completeFormDataContext[page][questionId]?.validationSettings || {};
  
       
//         const { maxLength, regexPattern, isRequired } = validateSettings;
//         let errorMessage = '';
  
        
//         if (isRequired && (!answer || (Array.isArray(answer) && answer.length === 0))) {
//           errorMessage = 'This field is required';
//         }
  
        
//         if (maxLength && answer.length > maxLength) {
//           errorMessage = `Maximum length exceeded (${maxLength} characters allowed)`;
//         }
  
        
//         if (regexPattern) {
//           const regex = new RegExp(regexPattern);
//           if (!regex.test(answer)) {
//             errorMessage = `Invalid input, please give the specified pattern`;
//           }
//         }

//         initialFieldErrors[`${page}_${questionId}`] = errorMessage;
//       });
//     });
  
//     // Set initial field errors
//     setFieldErrors(initialFieldErrors);
//   }, [completeFormDataContext]);

//   // useEffect(() => {
//   //   console.log("all question", Object.keys(completeFormDataContext[1]));
//   //   console.log(
//   //     "all question value",
//   //     Object.values(completeFormDataContext[1])
//   //   );
//   // }, []);

//   useEffect(() => {
//     if (userNAME && userName !== userNAME) {
//       setUserName(userNAME);
//     }
//   }, [userNAME]);

//   return (
//     <div className="submit">
//       <div className="user_form">
//         <div className="user_form_section">
//           {renderUserNamePage()}

//           {/* <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px',fontFamily:'sans-serif',fontSize:'larger',fontWeight:'bold'}}>{wizardData.title}</div> */}

//           {currentPage !== 0 &&
//             Object.keys(completeFormDataContext).map((page) => {
//               const pageNumber = parseInt(page, 10);
//               console.log("pageNumber", pageNumber);
//               if (pageNumber !== currentPage) {
//                 console.log("yyyy");
//                 return null;
//               }

//               const questions = Object.keys(completeFormDataContext[page]);
//               if (questions.length === 0) {
//                 return null;
//               }

//               return (
//                 <Paper elevation={8}>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       paddingTop: "20px",
//                       fontFamily: "sans-serif",
//                       fontSize: "larger",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {wizardData.title}
//                   </div>
//                   <div key={`page-${page}`} className="user_form_questions">
//                     <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
//                       {"PAGE " + pageNumber +"currentPage"+currentPage}
//                     </div>
//                     {console.log("question of--",questions)}

//                     {questions.map((questionId, index) => (
//                       <div key={`question-${questionId}`}>
//                         {console.log("question not map", questionId)}
//                         {console.log(
//                           "hhhhhhhhhh",
//                           completeFormDataContext[page][questionId]
//                         )}
//                         {renderQuestion(
//                           questionId,
//                           completeFormDataContext[page][questionId],
//                           page,
//                           index + 1,
//                           completeFormDataContext[page][questionId]
//                             .validationSettings
//                         )}
//                       </div>
//                     ))}
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: 20,
//                         justifyContent: "space-between",
//                         marginTop: "20px",
//                       }}
//                     >
//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={handlePreviousPage}
//                         disabled={handlePrevDisable()}
//                       >
//                         Prev
//                       </Button>

//                       {currentPage ===
//                         arrayOfPages[arrayOfPages.length - 1] && (
//                         <Button
//                           variant="outlined"
//                           color="primary"
//                           onClick={handleSubmit}
//                           // disabled={!fieldsCompleted || !isValidField}
//                           // disabled={!isValidField}
//                           disabled={
//                             // !isAnyFieldFilled() ||
//                             // !areAllFieldsValid() ||
//                             !hasFieldErrors||
                            
//                             !fieldsCompleted 
                            
//                           }
//                         >
//                           Submit
//                         </Button>
//                       )}

//                       {/* <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={handleSubmit}
//                         disabled={!handleNextDisable()}
//                       >
//                         Submit
//                       </Button> */}
//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={handleBack}
//                       >
//                         Back
//                       </Button>

//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={handleNextPage}
//                         disabled={handleNextDisable()}
//                         // disabled={!hasFalseValue}
//                       >
//                         Next
//                       </Button>
//                     </div>
//                   </div>
//                 </Paper>
//               );
//             })}
//         </div>
//       </div>


//       <Button
//         variant="outlined"
//         color="primary"
//         onClick={handleSubmit}
//         disabled={!fieldsCompleted}
//       >
//         Submitq
//       </Button>

//       {/* Modal for choosing API Endpoint */}
//       <Modal
//         open={showModal}
//         onClose={() => setShowModal(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Box sx={{ width: 300, bgcolor: "background.paper", p: 4 }}>
//           <h3 id="modal-modal-title" style={{marginBottom:'10px'}}>Enter API Endpoint</h3>
          
//           <TextField
//             label="API Endpoint"
//             variant="outlined"
//             value={apiEndpoint}
//             onChange={(e) => setApiEndpoint(e.target.value)}
//             fullWidth
//             sx={{ mb: 2,marginBottom:'10px' }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmission}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default PreviewForm;
