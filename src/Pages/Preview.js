import '../CSS/user_form.css';
import React, { useContext, useState } from 'react';
import {
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WizardContext } from '../Context/WizardContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const PreviewForm = () => {
  const { userId } = useParams();
  const { wizardData, completeFormDataContext, setCompleteFormDataContext } = useContext(WizardContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const handleOptionChange = (questionId, value, page) => {
    setCompleteFormDataContext((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      if (!updatedFormData[page]) {
        updatedFormData[page] = {};
      }
      updatedFormData[page][questionId] = {
        ...updatedFormData[page][questionId],
        answer: value,
      };
      return updatedFormData;
    });
  };

  const handleSubmit = () => {
    const combinedObject = { ...wizardData, completeFormDataContext };
    axios
      .post(`http://localhost:8080/saveData/${userId}`, combinedObject, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(
          'Data sent to the backend successfully with answer',
          response.data
        );
        navigate('/');
      })
      .catch((error) => {
        console.log('Error sending data to the backend', error.message);
      });
  };

  const handleBack = () => {
    navigate(`/ui/${userId}`);
  };

  const renderQuestion = (questionId, questionData, page) => {
    if (
      !completeFormDataContext ||
      !completeFormDataContext[page] ||
      !questionData ||
      !Array.isArray(questionData.options)
    ) {
      return null;
    }
    const { question, options } = questionData;

    return (
      <div key={questionId}>
        <Typography variant="body1" gutterBottom>
          {question}
        </Typography>
        <FormControl fullWidth>
          <InputLabel id={`dropdown-label-${questionId}`}>
            Select an option
          </InputLabel>
          <Select
            labelId={`dropdown-label-${questionId}`}
            id={`dropdown-${questionId}`}
            value={completeFormDataContext[page][questionId]?.answer || ''}
            label={`Select an option for ${question}`}
            onChange={(e) => handleOptionChange(questionId, e.target.value, page)}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  const arrayOfPages = Object.keys(completeFormDataContext).map((page) => parseInt(page, 10))
  

  const getNextPage = (current) => {
    const nextPage = arrayOfPages.find((page) => page > current);
    return nextPage; 
  };

  const getPreviousPage = (current) => {
    const previousPage = arrayOfPages
      .reverse()
      .find((page) => page < current);
    return previousPage; 
  };

  const handleNextPage = () => {
    const nextPage = getNextPage(currentPage);
    setCurrentPage(nextPage);
  };

  const handlePreviousPage = () => {
    const previousPage = getPreviousPage(currentPage);
    setCurrentPage(previousPage);
  };
  
  console.log("preview cfdc",completeFormDataContext);


  return (
    <div className="submit">
      <div className="user_form">
        <div className="user_form_section">
          {Object.keys(completeFormDataContext).map((page) => {
            const pageNumber = parseInt(page, 10);
            console.log("pageNumber",pageNumber);
            if (pageNumber !== currentPage) {
              console.log("yyyy");
              return null; 
            }

            const questions = Object.keys(completeFormDataContext[page]);
            if (questions.length === 0) {
              return null; 
            }

            return (
              <Paper elevation={8}>
              <div key={`page-${page}`} className="user_form_questions">
                {questions.map((questionId) => (
                  <div key={`question-${questionId}`}>
                    {renderQuestion(questionId,completeFormDataContext[page][questionId],page)}
                  </div>
                ))}
                <Button
              variant="contained"
              color="primary"
              onClick={handlePreviousPage}
            >
              Previous
            </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextPage}
                >
                  Next
                </Button>
              </div>
              </Paper>
            );
          })}
        </div>
        <div className="user_form_submit">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="contained" color="primary" onClick={handleBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewForm;






