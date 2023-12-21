import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import { WizardContext } from "../Context/WizardContext";

const Preview = () => {
  const navigate = useNavigate();
  //global state
  const { completeFormDataContext } = useContext(WizardContext);

  // const renderComponentsBySeq = ()=>{
  const renderedData = Object.values(completeFormDataContext);

  console.log("rendered darta", renderedData);

  // const renderComponentsBySeq = () => {
  //   const componentsBySeq = [
  //     ...completeFormDataContext.textBoxes,
  //     ...completeFormDataContext.radioButtons,
  //     ...completeFormDataContext.checkboxes,
  //     ...completeFormDataContext.multiSelectOptions,
  //     ...completeFormDataContext.textArea

  //   ];
  //   console.log(componentsBySeq)
  //   //sort by seq
  //   const sortedFormData = componentsBySeq.sort((a, b) => a.seq - b.seq);
  //   console.log(sortedFormData);
  //   //return "heelo";
  //   return sortedFormData.map((data,index)=>{
  //       switch (data.type) {
  //           case "textbox":
  //               return (

  //                   <Card key={index} style={{ margin: '10px', borderRadius: '8px',width:'50%',backgroundColor:'#d6d4ce' }}>
  //                     <CardContent>
  //                       <Typography variant="h5">Text Box Question:</Typography>
  //                       <Typography variant="body1">{data.question}</Typography>
  //                       <Typography variant="subtitle1">Options:</Typography>
  //                       <List>
  //                         {data.options.map((option, optionIndex) => (
  //                           <ListItem key={optionIndex}>{option}</ListItem>
  //                         ))}
  //                       </List>
  //                     </CardContent>
  //                   </Card>

  //                 );

  //           case "checkbox":
  //               return (
  //                   <Card key={index} style={{ margin: '10px', borderRadius: '8px',width:'50%',backgroundColor:'#d6d4ce' }}>
  //                     <CardContent>
  //                       <Typography variant="h5">Check Box Question:</Typography>
  //                       <Typography variant="body1">{data.question}</Typography>
  //                       <Typography variant="subtitle1">Options:</Typography>
  //                       <List>
  //                         {data.options.map((option, optionIndex) => (
  //                           <ListItem key={optionIndex}>{option}</ListItem>
  //                         ))}
  //                       </List>
  //                     </CardContent>
  //                   </Card>
  //               );

  //           case "mcq":
  //             return(
  //               <Card key={index} style={{ margin: '10px', borderRadius: '8px',width:'50%',backgroundColor:'#d6d4ce' }}>
  //                     <CardContent>
  //                       <Typography variant="h5">Check Box Question:</Typography>
  //                       <Typography variant="body1">{data.question}</Typography>
  //                       <Typography variant="subtitle1">Options:</Typography>
  //                       <List>
  //                         {data.options.map((option, optionIndex) => (
  //                           <ListItem key={optionIndex}>{option}</ListItem>
  //                         ))}
  //                       </List>
  //                     </CardContent>
  //                   </Card>
  //             )

  //           case "radio":
  //             return(
  //               <Card key={index} style={{ margin: '10px', borderRadius: '8px',width:'50%',backgroundColor:'#d6d4ce' }}>
  //                     <CardContent>
  //                       <Typography variant="h5">Check Box Question:</Typography>
  //                       <Typography variant="body1">{data.question}</Typography>
  //                       <Typography variant="subtitle1">Options:</Typography>
  //                       <List>
  //                         {data.options.map((option, optionIndex) => (
  //                           <ListItem key={optionIndex}>{option}</ListItem>
  //                         ))}
  //                       </List>
  //                     </CardContent>
  //                   </Card>
  //             )

  //           case "textarea":
  //             return(
  //               <Card key={index} style={{ margin: '10px', borderRadius: '8px',width:'50%',backgroundColor:'#d6d4ce' }}>
  //                     <CardContent>
  //                       <Typography variant="h5">Check Box Question:</Typography>
  //                       <Typography variant="body1">{data.question}</Typography>
  //                       <Typography variant="subtitle1">Description:</Typography>
  //                       <List>
  //                         {data.textDescription}
  //                       </List>
  //                     </CardContent>
  //                   </Card>
  //             )

  //           default:
  //               break;
  //       }

  //   })
  //   // return componentsBySeq
  //   //   .sort((a, b) => a.seq - b.seq)
  //   //   .map((component) => renderComponent(component));

  // };

  // const renderComponentsBySeq = ()=>{
  //   const componentsBySeq = [...completeFormDataContext];
  //   console.log(componentsBySeq);
  //   return "he"
  // }

  const handleBack = () => {
    //navigate('/ui',{ state: { formDataFromLocation: formDataFromLocation } })
    navigate("/ui");
  };

  return (
    <div>
      <h1>Form Components Preview</h1>
      <Button variant="contained" color="success" onClick={handleBack}>
        Back
      </Button>
      {renderedData.map((page, index) => (
        <div key={index}>
          <h2>Page {index + 1}</h2>
          {Object.values(page).map((question, questionIndex) => (
            <div key={questionIndex} className="question-container">
              <h3>Question {questionIndex + 1}</h3>
              <p>Type: {question.type}</p>
              <p>Question: {question.question}</p>
              <p>Options:</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      

      {/* {renderComponentsBySeq()} */}
    </div>
  );
};

export default Preview;
