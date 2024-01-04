import React, { useState, useContext, useEffect } from 'react';
import { Typography, TextField, Box } from '@mui/material';
import { WizardContext } from '../../Context/WizardContext';

const TextArea = (props) => {

  const [errors,setErrors] = useState({});

  // Global state,
  const { completeFormDataContext,selectedComponents,setId,setIsValid,id, setCompleteFormDataContext,currentCount} = useContext(WizardContext);

  console.log("textArea props",props);
  // Local state
  const [formData, setFormData] = useState({
    page:currentCount,
    type:'textarea',
    question: Object.keys(props).includes('question')?props.question:'',
    textDescription: Object.keys(props).includes('textDescription')?props.textDescription:'',
    //options: Object.keys(props).includes('options')?props.options:[],
    Uid: props.uniqueId,
    answer:Object.keys(props).includes('answer')?props.answer:'',
    
    
  });

  //validate question
  const validateTextAreaForm = (e) =>{

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
    setIsValid(validateTextAreaForm({question : e.target.value}));
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
    const allCheckBox = selectedComponents.filter((element)=>element.type.name==='TextArea');
    let validationStatus = true;
    allCheckBox.forEach((checkbox)=>{
      const validationValue = validateTextAreaForm({question: checkbox.props.question})
      validationStatus = validationStatus && validationValue
      if(!validationStatus)
        return;
    })
    setIsValid(validationStatus);
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setGlobalSeq(globalSeq + 1);

  //   console.log('From TextArea comp. :', formData);

  //   // Clone and update context data
  //   const textAreaUpdate = { ...completeFormDataContext };
  //   textAreaUpdate.textArea.push(formData);

  //   setCompleteFormDataContext(textAreaUpdate);
  //   onRemove();

  //   setFormData({
  //     question: '',
  //     textDescription: '',
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
        Create Your TextArea Wizard
      </Typography>
      <form>
        <div style={{display:'flex',flexDirection:'column'}}>
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
        </div>
      </form>
    </Box>
  );
};

export default TextArea;
