
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




import React, { useState } from 'react';
import { Typography, TextField, Button, FormControl, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../CSS/textboxes.css';

const TextBoxes = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Submitted:', { question, options });
   
    setQuestion('');
    setOptions([]);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: '20px', backgroundColor: '#F3F5F0', borderRadius: '8px', boxShadow: '0px 3px 6px #00000029' }}>
      <Typography variant="h5" gutterBottom>
        Create Your Textbox Wizard
      </Typography>
      <form onSubmit={handleSubmit}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center', alignItems:'center',height:'70px',gap:'10px'}}>
          <TextField
            label="Question"
            fullWidth
            value={question}
            onChange={handleQuestionChange}
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" type="submit" sx={{ display: 'flex', height: '53px'}}>
            Submit
          </Button>
        </div>

        <FormControl component="fieldset" sx={{ mb: 4, mt: 2 }}>
          {options.map((option, index) => (
            <div key={index} style={{display:'flex',flexDirection:'row',justifyContent:'center', alignItems:'center',marginBottom:'8px',backgroundColor:'#ffffff',boxShadow:'0px 3px 6px #00000029',borderRadius:'8px',padding:'8px'}}>
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
            variant="contained"
            onClick={addOption}
            disabled={options.length === 4}
            sx={{ mt: 2 }}
          >
            Add Option
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default TextBoxes;
