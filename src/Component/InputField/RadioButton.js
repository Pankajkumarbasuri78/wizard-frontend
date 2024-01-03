import React, { useContext, useEffect, useState } from 'react';
import { Typography, TextField, Button, FormControl, Box, IconButton, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../CSS/textboxes.css';
import { WizardContext } from '../../Context/WizardContext';

const RadioButton = (props) => {

  const [errors,setErrors] = useState({});

  //global state
  const {completeFormDataContext,selectedComponents,setId,setIsValid,id,setCompleteFormDataContext,globalSeq,setGlobalSeq,currentCount} = useContext(WizardContext)


  const [formData, setFormData] = useState({
    page:currentCount,
    type:'radio',
    question: Object.keys(props).includes('question')?props.question:'',
    options: Object.keys(props).includes('options')?props.options:[],
    Uid: props.uniqueId,
    answer:Object.keys(props).includes('answer')?props.answer:'',
  });

  //validate question
  const validateRadioForm = (e) =>{

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

  const handleQuestionChange = (e) => {
    setFormData({ ...formData, question: e.target.value });
    updateCompleteFormData(formData.Uid, {
      ...formData,
      question: e.target.value,
    });

    //validate question
    setIsValid(validateRadioForm({question : e.target.value}));
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

          return updatedContext;
        }
      }
      
      return prevContext;
    });
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
    const allCheckBox = selectedComponents.filter((element)=>element.type.name==='RadioButton');
  let validationStatus = true;
  allCheckBox.forEach((radio)=>{
    const validationValue = validateRadioForm({question: radio.props.question})
    validationStatus = validationStatus && validationValue
    if(!validationStatus)
      return;
  })
  setIsValid(validationStatus);
  }, []);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setGlobalSeq(globalSeq+1);

  //   onRemove();

  //   console.log('Submitted:', formData);

  //   const textBoxUpdate = structuredClone(completeFormDataContext)
  //   textBoxUpdate.radioButtons.push(formData)
  //   console.log("radiocontext");
  //   console.log(textBoxUpdate);

  //   setCompleteFormDataContext(textBoxUpdate);
   

    
  //   setFormData({
  //     question: '',
  //     options: [],

  //   });

  // };

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
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: '20px', backgroundColor: '#F3F5F0', borderRadius: '8px', boxShadow: '0px 3px 6px #00000029' }}>
      <Typography variant="h5" gutterBottom>
        Create Your RadioButton Component
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

        <FormControl component="fieldset" sx={{ mb: 4, mt: 2 }}>
          <RadioGroup value={formData.selectedOption} onChange={(e) => setFormData({ ...formData, selectedOption: e.target.value })}>
            {formData.options.map((option, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '8px', backgroundColor: '#ffffff', boxShadow: '0px 3px 6px #00000029', borderRadius: '8px', padding: '8px' }}>
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={
                    <TextField
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  }
                />
                <IconButton onClick={() => removeOption(index,formData.Uid)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </RadioGroup>
          <Button
            variant="outlined"
            onClick={addOption}
            disabled={formData.options.length === 4}
            sx={{ mt: 2 }}
            style={{width:150}}
          >
            Add Option
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default RadioButton;


