import "../CSS/user_form.css";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  ListItemText,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { WizardContext } from "../Context/WizardContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const PreviewForm = () => {
  const {
    wizardData,
    completeFormDataContext,
    setCompleteFormDataContext,
    userNAME,
  } = useContext(WizardContext);

  const [fieldsCompleted, setFieldsCompleted] = useState(false);
  const [userName, setUserName] = useState(userNAME || "");
  const [currentPage, setCurrentPage] = useState(0);

  const [userNameError, setUserNameError] = useState("");

  const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

  const { userId } = useParams();
  console.log("preview user id", userId);

  const navigate = useNavigate();

  const checkFieldsCompletion = (formData) => {
    let allFieldsFilled = true;
    Object.keys(formData).forEach((page) => {
      Object.keys(formData[page]).forEach((questionId) => {
        const answer = formData[page][questionId]?.answer;
        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
          allFieldsFilled = false;
        }
      });
    });
    setFieldsCompleted(allFieldsFilled);
  };

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
      checkFieldsCompletion(updatedFormData);
      return updatedFormData;
    });
  };

  let typingTimeout;

  const handleUserNameChange = async (e) => {
    setUserName(e.target.value);
    // Clear the previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    typingTimeout = setTimeout(async () => {
      try {
        const resUser = await axios.post(
          `http://localhost:8080/checkUserRes/${userId}/${e.target.value}`
        );

        if (resUser.data === "user found") {
          setUserNameError("Username already exits.Please give another.");
        } else {
          setUserNameError("");
        }
        // console.log("response user name", resUser.data);
      } catch (error) {}
    }, 800);

    console.log("userName", userName);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  
    // Perform email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[gmail]+\.[com]{3}$/ ; 
    const isValidEmail = emailRegex.test(newEmail);
  
    if (!isValidEmail) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };
  // const handleDescriptionChange = (questionId, value, page) => {
  //   setCompleteFormDataContext((prevFormData) => {
  //     const updatedFormData = { ...prevFormData };
  //     if (!updatedFormData[page]) {
  //       updatedFormData[page] = {};
  //     }
  //     updatedFormData[page][questionId] = {
  //       ...updatedFormData[page][questionId],
  //       textDescription: value,
  //     };
  //     return updatedFormData;
  //   });
  // };

  const handleSubmit = () => {
    const combinedObject = { ...wizardData, completeFormDataContext };
    axios
      .post(`http://localhost:8080/saveData/${userId}`, combinedObject, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(
          "Data sent to the backend successfully with answer",
          response.data
        );
        navigate("/");
      })
      .catch((error) => {
        console.log("Error sending data to the backend", error.message);
      });

    axios
      .post(
        `http://localhost:8080/saveUserRes/${userId}/${userName}`,
        combinedObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(
          "Data sent to the backend successfully with answer",
          response.data
        );
        navigate("/");
      })
      .catch((error) => {
        console.log("Error sending data to the backend", error.message);
      });
  };

  const handleBack = () => {
    navigate(`/ui/${userId}`);
  };

  //render question----------
  const renderQuestion = (questionId, questionData, page, questionNo) => {
    console.log("here");
    if (
      !completeFormDataContext ||
      !completeFormDataContext[page] ||
      !questionData ||
      (questionData.type !== "textarea" &&
        questionData.type !== "textbox" &&
        !Array.isArray(questionData.options))
    ) {
      return null;
    }
    const { type, question, options } = questionData;

    const handleInputChange = (value) => {
      handleOptionChange(questionId, value, page);
    };

    console.log("questionnumber", questionNo);

    switch (type) {
      case "textbox":
        return (
          <div key={questionId} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Typography>{questionNo + "."}</Typography>
              <Typography variant="body1" gutterBottom>
                {question}
              </Typography>
            </div>
            {console.log(
              "textFiled se pehle",
              completeFormDataContext[page][questionId]
            )}
            <TextField
              fullWidth
              variant="outlined"
              value={completeFormDataContext[page][questionId]?.answer || ""}
              onChange={(e) =>
                handleOptionChange(questionId, e.target.value, page)
              }
            />
          </div>
        );
      case "textarea":
        return (
          <div key={questionId} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Typography>{questionNo + "."}</Typography>
              <Typography variant="body1" gutterBottom>
                {question}
              </Typography>
            </div>
            <TextField
              label="Text Description"
              fullWidth
              multiline
              rows={4}
              value={completeFormDataContext[page][questionId]?.answer || ""}
              onChange={(e) => {
                handleOptionChange(questionId, e.target.value, page);
              }}
              sx={{ mb: 2, marginTop: "10px" }}
            />
          </div>
        );

      // case "textarea":
      // return (
      //   <div key={questionId} style={{ marginBottom: "20px" }}>
      //     <div style={{display:'flex',gap:'5px'}}>
      //     <Typography>
      //       {questionNo+"."}
      //     </Typography>
      //     <Typography variant="body1" gutterBottom>
      //       {question}
      //     </Typography>
      //     </div>
      //     <TextField
      //       label="Text Description"
      //       fullWidth
      //       multiline
      //       rows={4}
      //       value={
      //         completeFormDataContext[page][questionId]?.textDescription || ""
      //       }
      //       onChange={(e) => {
      //         handleDescriptionChange(questionId, e.target.value, page);
      //       }}
      //       sx={{ mb: 2,marginTop:'10px' }}
      //     />
      //   </div>
      // );

      case "dropdown":
        return (
          <div key={questionId} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Typography>{questionNo + "."}</Typography>
              <Typography variant="body1" gutterBottom>
                {question}
              </Typography>
            </div>
            <FormControl fullWidth sx={{ marginTop: "10px" }}>
              <InputLabel id={`dropdown-label-${questionId}`}>
                Select an option
              </InputLabel>
              <Select
                labelId={`dropdown-label-${questionId}`}
                id={`dropdown-${questionId}`}
                value={completeFormDataContext[page][questionId]?.answer || ""}
                label={`Select an option for ${question}`}
                onChange={(e) =>
                  handleOptionChange(questionId, e.target.value, page)
                }
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

      case "checkbox":
        return (
          <div key={questionId} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Typography>{questionNo + "."}</Typography>
              <Typography variant="body1" gutterBottom>
                {question}
              </Typography>
            </div>
            <FormGroup>
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={
                        completeFormDataContext[page][questionId]?.answer ===
                        option
                      }
                      onChange={(e) => {
                        const checkedOption = e.target.checked ? option : "";
                        handleInputChange(checkedOption);
                      }}
                      name={option}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          </div>
        );

      case "radio":
        return (
          <div key={questionId} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Typography>{questionNo + "."}</Typography>
              <Typography variant="body1" gutterBottom>
                {question}
              </Typography>
            </div>
            <RadioGroup
              value={completeFormDataContext[page][questionId]?.answer || ""}
              onChange={(e) =>
                handleOptionChange(questionId, e.target.value, page)
              }
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
          </div>
        );

      case "mcq":
        return (
          <div key={questionId} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Typography>{questionNo + "."}</Typography>
              <Typography variant="body1" gutterBottom>
                {question}
              </Typography>
            </div>
            <FormControl fullWidth sx={{ marginTop: "10px" }}>
              <InputLabel id={`multiselect-label-${questionId}`}>
                Select multiple options
              </InputLabel>
              <Select
                labelId={`multiselect-label-${questionId}`}
                id={`multiselect-${questionId}`}
                multiple
                value={completeFormDataContext[page][questionId]?.answer || []}
                onChange={(e) =>
                  handleOptionChange(questionId, e.target.value, page)
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    <Checkbox
                      checked={
                        completeFormDataContext[page][
                          questionId
                        ]?.answer?.indexOf(option) > -1
                      }
                    />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        );

      default:
        return null;
    }
    // setQuestionCount(questionNo);
  };

  const arrayOfPages = Object.keys(completeFormDataContext).map((page) =>
    parseInt(page, 10)
  );

  const getNextPage = (current) => {
    const nextPage = arrayOfPages.find((page) => page > current);
    return nextPage;
  };

  const getPreviousPage = (current) => {
    const previousPage = arrayOfPages.reverse().find((page) => page < current);
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

  console.log("preview cfdc", completeFormDataContext);

  const handlePrevDisable = () => {
    return currentPage === arrayOfPages[0];
  };

  const handleNextDisable = () => {
    return currentPage === arrayOfPages[arrayOfPages.length - 1];
  };

  // const renderUserNamePage = () => {
  //   if (currentPage !== 1) {
  //     return null;
  //   }

  const isPage0Valid = () => {
    return !userNameError && !emailError && userName && email;
  };
  //render Page 0-------------
  const renderUserNamePage = () => {
    if (currentPage !== 0) {
      return null;
    }

    return (
      <Paper elevation={8}>
        <div className="user_form_questions">
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
            {"PAGE " + currentPage}
          </div>

          <div key="question-userName">
            <div>
              <Typography variant="body1" gutterBottom>
                Enter Your Name:
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userName}
                onChange={handleUserNameChange}
              />
              {userNameError && (
                <div
                  style={{ color: "red", marginTop: "2px", fontSize: "15px" }}
                >
                  {userNameError}
                </div>
              )}
            </div>
          </div>

          <div key="question-email">
            <div>
              <Typography variant="body1" gutterBottom>
                Enter Your Email:
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <div
                  style={{ color: "red", marginTop: "2px", fontSize: "15px" }}
                >
                  {emailError}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleNextPage}
              // disabled={!userName}
              disabled={!isPage0Valid()}
            >
              Next
            </Button>
          </div>
        </div>
      </Paper>
    );
  };

  // useEffect(()=>{
  //   console.log("useCurrentpage",currentPage);
  //   console.log("array",arrayOfPages[arrayOfPages.length-1]);
  //   console.log(currentPage ===  arrayOfPages[arrayOfPages.length-1]);
  //   console.log("firsttttt",arrayOfPages[0]);
  // },[currentPage])

  useEffect(() => {
    console.log("all question", Object.keys(completeFormDataContext[1]));
    console.log(
      "all question value",
      Object.values(completeFormDataContext[1])
    );
  }, []);
  useEffect(() => {
    if (userNAME && userName !== userNAME) {
      setUserName(userNAME);
    }
  }, [userNAME]);

  return (
    <div className="submit">
      <div className="user_form">
        <div className="user_form_section">
          {renderUserNamePage()}

          {/* <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px',fontFamily:'sans-serif',fontSize:'larger',fontWeight:'bold'}}>{wizardData.title}</div> */}

          {currentPage !== 0 &&
            Object.keys(completeFormDataContext).map((page) => {
              const pageNumber = parseInt(page, 10);
              console.log("pageNumber", pageNumber);
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "20px",
                      fontFamily: "sans-serif",
                      fontSize: "larger",
                      fontWeight: "bold",
                    }}
                  >
                    {wizardData.title}
                  </div>
                  <div key={`page-${page}`} className="user_form_questions">
                    <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      {"PAGE " + pageNumber}
                    </div>

                    {questions.map((questionId, index) => (
                      <div key={`question-${questionId}`}>
                        {console.log("question not map", questionId)}
                        {renderQuestion(
                          questionId,
                          completeFormDataContext[page][questionId],
                          page,
                          index + 1
                        )}
                      </div>
                    ))}
                    <div
                      style={{
                        display: "flex",
                        gap: 20,
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handlePreviousPage}
                        disabled={handlePrevDisable()}
                      >
                        Prev
                      </Button>

                      {currentPage ===
                        arrayOfPages[arrayOfPages.length - 1] && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleSubmit}
                          disabled={!fieldsCompleted}
                        >
                          Submit
                        </Button>
                      )}

                      {/* <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!handleNextDisable()}
                      >
                        Submit
                      </Button> */}
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleBack}
                      >
                        Back
                      </Button>

                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleNextPage}
                        disabled={handleNextDisable()}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </Paper>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PreviewForm;
