
import '../CSS/user_form.css'

import React, { useContext } from 'react';
import { Button, Typography, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WizardContext } from '../Context/WizardContext';

function PreviewForm() {
  const { completeFormDataContext,setCompleteFormDataContext } = useContext(WizardContext);
  const navigate = useNavigate();

  console.log("preview",completeFormDataContext);

 

  const handleOptionChange = (questionId, value,page) => {
    console.log("qid",questionId,"value---",value);

    // setCompleteFormDataContext()
    setCompleteFormDataContext((prevFormData) => {
      console.log("completedata-",Object.values(prevFormData));
      
      const updatedFormData = { ...prevFormData};
      console.log("page in-",updatedFormData[page][questionId].answer);
      updatedFormData[page][questionId].answer = value;
      return updatedFormData;
    });
  };
 
  
  const handleSubmit = () => {
    navigate(`/submitted`);
  };
  

  const handleBack = () => {
    navigate('/ui');
  };
  const renderQuestion = (questionId, questionData,page) => {
    if (!questionData || !Array.isArray(questionData.options)) {
      return null;
    }
    const { question, options } = questionData;
    console.log("question and options -",question,options);

    return (
      <div key={questionId}>
        <Typography variant="body1" gutterBottom>
          {question}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            // aria-label={`question-${questionId}`}
            // name={`question-${questionId}`}
            value={completeFormDataContext[page][questionId]?.answer || ''}
            onChange={(e) => handleOptionChange(questionId, e.target.value,page)}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    );
  };

  // const renderQuestion = (questionId, questionData) => {
  //   const { type, question, options } = questionData;
  //   console.log("type- ",type);
  //   if (type === 'textbox') {
  //     return (
  //       <div key={questionId}>
  //         <Typography variant="body1" gutterBottom>
  //           {question}
  //         </Typography>
  //         <FormControl component="fieldset">
  //         <RadioGroup
  //           fullWidth
  //           variant="outlined"
  //           value={answers[questionId] || ''}
  //           onChange={(e) => handleInputChange(questionId, e.target.value)}
  //           placeholder="Enter your answer"
  //         >
  //         {options.map((option,i)=>{
  //           <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
  //         })}
  //         </RadioGroup>
  //         </FormControl>
  //       </div>
  //     );
  //   } else if (type === 'checkbox' || type === 'radio') {
  //     return (
  //       <div key={questionId}>
  //         <Typography variant="body1" gutterBottom>
  //           {question}
  //         </Typography>
  //         <FormControl component="fieldset">
  //           <RadioGroup
  //             row={type === 'radio'}
  //             aria-label={`question-${questionId}`}
  //             name={`question-${questionId}`}
  //             value={answers[questionId] || ''}
  //             onChange={(e) => handleInputChange(questionId, e.target.value)}
  //           >
  //             {options.map((option, index) => (
  //               <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
  //             ))}
  //           </RadioGroup>
  //         </FormControl>
  //       </div>
  //     );
  //   }
  //   return null;
  // };
// console.log("1",Object.keys(completeFormDataContext));
// console.log("2",Object.keys(completeFormDataContext[1]));
  return (
    <div className="submit">
      <div className="user_form">
        <div className="user_form_section">
          {Object.keys(completeFormDataContext).map((page) => (
            <div key={`page-${page}`} className="user_form_questions">
              {`page-${page}`}
              {Object.keys(completeFormDataContext[page]).map((questionId) => (
                <div key={`question-${questionId}`}>
                  {console.log("questionid-",questionId,"==page-",page)}
                  {console.log("extra",completeFormDataContext[page][questionId])}
                  {renderQuestion(questionId, completeFormDataContext[page][questionId],page)}
                </div>
              ))}
            </div>
          ))}

          <div className="user_form_submit">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back
            </Button>
          </div>

          <div className="user_footer">Google Forms</div>
        </div>
      </div>
    </div>
  );
}

export default PreviewForm;
