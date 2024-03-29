import React, { useContext, useEffect, useState } from 'react';
import { Typography, TextField, Button, FormControl, Box, IconButton,FormControlLabel,Modal,Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../CSS/textboxes.css';
import { WizardContext } from '../../Context/WizardContext';

const MultiSelectOption = (props) => {

  const [errors,setErrors] = useState({});

  const [isRequired, setIsRequired] = useState(false);
  const [validationModalOpen, setValidationModalOpen] = useState(false);
  const [validationSettings, setValidationSettings] = useState({
    regexPattern: "",
    maxLength: "",
    isRequired: false,
  });

  //global state
  const {completeFormDataContext,setId,id,setIsValid,selectedComponents,setCompleteFormDataContext,globalSeq,setGlobalSeq,currentCount} = useContext(WizardContext)

  const [formData, setFormData] = useState({
    page:currentCount,
    type:'mcq',
    question: Object.keys(props).includes('question')?props.question:'',
    options: Object.keys(props).includes('options')?props.options:[],
    Uid: props.uniqueId,
    answer:Object.keys(props).includes('answer')?props.answer:'',
  });

  //validate question
  const validateMcqForm = (e) =>{

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
  }

  //validate options
  const validateOptionForm = (options) => {

    let optionValid = true;
    const newErrors = {};

    options.forEach((option,i)=>{
      if(!option || option.trim() === ""){
        newErrors[`option${i+1}`] = `Option ${i+1} can't be empty`;
        optionValid = false;
      }

    })

    setErrors((previousError) => ({...previousError,...newErrors }));
    return optionValid;
  }

  const handleQuestionChange = (e) => {
    setFormData({ ...formData, question: e.target.value });
    updateCompleteFormData(formData.Uid, {
      ...formData,
      question: e.target.value,
    });

    //validate question
    setIsValid(validateMcqForm({question : e.target.value}));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
    updateCompleteFormData(formData.Uid, {
      ...formData,
      options: updatedOptions,
    });

    //call validate
    setIsValid(validateOptionForm(updatedOptions));
  };

  const addOption = () => {
    const hasEmptyOption = formData.options.some((option) => option.trim() === '');

    if (!hasEmptyOption && formData.options.length < 4) {
      setFormData({ ...formData, options: [...formData.options, ''] });
    }
  };

  const removeOption = (index, uid) => {
    const updatedOptions = [...formData.options];
    updatedOptions.splice(index, 1);
    setFormData({ ...formData, options: updatedOptions });
  
    setCompleteFormDataContext((prevContext) => {
      const updatedContext = { ...prevContext };
      const currentPageData = { ...updatedContext[currentCount] };
  
      
      if (currentPageData && currentPageData[uid]) {
        const currentPageOptions = [...currentPageData[uid].options];
        
        console.log("remove option",currentPageData[uid]);
        console.log("index",index,"uid",uid);

        
        if (currentPageOptions) {
          currentPageOptions.splice(index, 1);
          currentPageData[uid].options = currentPageOptions;
          updatedContext[currentCount] = currentPageData;

          // Update the completeFormDataContext
          return updatedContext;
        }
      }
      
      // Return the unchanged context
      return prevContext;
    });
  };

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
    const allCheckBox = selectedComponents.filter((element)=>element.type.name==='MultiSelectOption');
  let validationStatus = true;
  allCheckBox.forEach((checkbox)=>{
    const validationValue = validateMcqForm({question: checkbox.props.question})
    validationStatus = validationStatus && validationValue
    if(!validationStatus)
      return;
  })
  setIsValid(validationStatus);
  }, []);

  

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: '20px', backgroundColor: '#F3F5F0', borderRadius: '8px', boxShadow: '0px 3px 6px #00000029' }}>
      <Typography variant="h5" gutterBottom>
        Create Your Multi-Select Option
      </Typography>
      <form>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '70px', gap: '10px' }}>
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
          {/* <Button variant="contained" color="primary" type="submit" sx={{ display: 'flex', height: '53px' }}>
            Submit
          </Button> */}
        </div>

          {formData.options.map((option, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '8px', backgroundColor: '#ffffff', boxShadow: '0px 3px 6px #00000029', borderRadius: '8px', padding: '8px' }}>
              <TextField
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ flex: 1, mr: 1 }}
                error={Boolean[`option${index + 1}`]}
                helperText={errors[`option${index + 1}`]}
              />
              <IconButton onClick={() => removeOption(index,formData.Uid)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        <Button
          variant="outlined"
          onClick={addOption}
          disabled={formData.options.length === 4}
          sx={{ mt: 2 }}
          fullWidth
          // style={{ width: 150 }}
        >
          Add Option
        </Button>
        <Button
            variant="outlined"
            color="primary"
            onClick={handleValidationModalOpen}
            style={{height:'30px'}}
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

export default MultiSelectOption;
