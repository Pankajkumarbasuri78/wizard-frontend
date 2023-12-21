import React, { useContext, useEffect, useState } from 'react';
import { Typography, TextField, Button, FormControl, Box, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../CSS/textboxes.css';
import { WizardContext } from '../../Context/WizardContext';

const CheckboxComponent = (props) => {

  //global state
  const {completeFormDataContext,setCompleteFormDataContext,currentCount} = useContext(WizardContext)

  // useEffect(()=>{
  //   console.log('object',Object.keys(props).includes('question')?props.question:'');
  // })

  const [formData, setFormData] = useState({
    page:currentCount,
    type:'checkbox',
    question: Object.keys(props).includes('question')?props.question:'',
    options: Object.keys(props).includes('options')?props.options:[],
    Uid: props.uniqueId
  });

  const handleQuestionChange = (e) => {
    setFormData({ ...formData, question: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const addOption = () => {
    if (formData.options.length < 4) {
      setFormData({ ...formData, options: [...formData.options, ''] });
    }
  };

  const removeOption = (index) => {
    const updatedOptions = [...formData.options];
    updatedOptions.splice(index, 1);
    setFormData({ ...formData, options: updatedOptions });
  };

  // const handleSubmit = (e) => {
  //   //e.preventDefault();
    
  //   console.log('Submitted:', { formData });
  //   setGlobalSeq(globalSeq+1);

  //   const textBoxUpdate = structuredClone(completeFormDataContext)
  //   textBoxUpdate.checkboxes.push(formData)
  //   console.log("texboxcontext");
  //   console.log(textBoxUpdate);

  //   setCompleteFormDataContext(textBoxUpdate);

  //   //onRemove();
  //   setFormData({
  //     question: '',
  //     options: [],
  //   });
  // };

  useEffect(()=>{
    setCompleteFormDataContext((prevContext)=>({...prevContext,[formData.page]:{
      ...prevContext[formData.page],[formData.Uid]:formData
    }}))
    console.log(completeFormDataContext);
  },[formData])

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: '20px', backgroundColor: '#F3F5F0', borderRadius: '8px', boxShadow: '0px 3px 6px #00000029' }}>
      <Typography variant="h5" gutterBottom>
        Create Your Checkbox Component
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
          />
          {/* <Button variant="contained" color="primary" type="submit" sx={{ display: 'flex', height: '53px' }}>
            Submit
          </Button> */}
        </div>

        <FormControl component="fieldset" sx={{ mb: 4, mt: 2 }}>
          {formData.options.map((option, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '8px', backgroundColor: '#ffffff', boxShadow: '0px 3px 6px #00000029', borderRadius: '8px', padding: '8px' }}>
              <Checkbox
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.checked ? e.target.value : '')}
                sx={{ mr: 1 }}
              />
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
            disabled={formData.options.length === 4}
            sx={{ mt: 2 }}
          >
            Add Option
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default CheckboxComponent;




// import React, { useContext, useState } from 'react';
// import { Typography, TextField, Button, FormControl, Box, Checkbox, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import '../../CSS/textboxes.css';
// import { WizardContext } from '../../Context/WizardContext';

// const CheckboxComponent = ({onRemove}) => {

//   //global state
//   const {completeFormDataContext,setCompleteFormDataContext,globalSeq,setGlobalSeq} = useContext(WizardContext)

//   const [formData, setFormData] = useState({
//     type:'checkbox',
//     question: '',
//     options: [],
//     seq: globalSeq
//   });

//   const handleQuestionChange = (e) => {
//     setFormData({ ...formData, question: e.target.value });
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...formData.options];
//     updatedOptions[index] = value;
//     setFormData({ ...formData, options: updatedOptions });
//   };

//   const addOption = () => {
//     if (formData.options.length < 4) {
//       setFormData({ ...formData, options: [...formData.options, ''] });
//     }
//   };

//   const removeOption = (index) => {
//     const updatedOptions = [...formData.options];
//     updatedOptions.splice(index, 1);
//     setFormData({ ...formData, options: updatedOptions });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     console.log('Submitted:', { formData });
//     setGlobalSeq(globalSeq+1);

//     const textBoxUpdate = structuredClone(completeFormDataContext)
//     textBoxUpdate.checkboxes.push(formData)
//     console.log("texboxcontext");
//     console.log(textBoxUpdate);

//     setCompleteFormDataContext(textBoxUpdate);

//     onRemove();
//     setFormData({
//       question: '',
//       options: [],
//     });
//   };

//   return (
//     <Box sx={{ maxWidth: 600, margin: 'auto', padding: '20px', backgroundColor: '#F3F5F0', borderRadius: '8px', boxShadow: '0px 3px 6px #00000029' }}>
//       <Typography variant="h5" gutterBottom>
//         Create Your Checkbox Component
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '70px', gap: '10px' }}>
//           <TextField
//             label="Question"
//             fullWidth
//             value={formData.question}
//             onChange={handleQuestionChange}
//             margin="normal"
//             variant="outlined"
//             sx={{ mb: 2 }}
//           />
//           <Button variant="contained" color="primary" type="submit" sx={{ display: 'flex', height: '53px' }}>
//             Submit
//           </Button>
//         </div>

//         <FormControl component="fieldset" sx={{ mb: 4, mt: 2 }}>
//           {formData.options.map((option, index) => (
//             <div key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '8px', backgroundColor: '#ffffff', boxShadow: '0px 3px 6px #00000029', borderRadius: '8px', padding: '8px' }}>
//               <Checkbox
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.checked ? e.target.value : '')}
//                 sx={{ mr: 1 }}
//               />
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
//             disabled={formData.options.length === 4}
//             sx={{ mt: 2 }}
//           >
//             Add Option
//           </Button>
//         </FormControl>
//       </form>
//     </Box>
//   );
// };

// export default CheckboxComponent;

