import React, { useState, useContext, useEffect } from "react";
import TextBoxes from "../Component/InputField/TextBoxes";
import CheckboxComponent from "../Component/InputField/Checkbox";
import Dropdown from "../Component/InputField/Dropdown";
import MultiSelectOption from "../Component/InputField/MultiSelectOption";
import RadioButton from "../Component/InputField/RadioButton";
import Button from "@mui/material/Button";
import "../CSS/UIPlanning.css";
import { useNavigate } from "react-router-dom";

import { WizardContext } from "../Context/WizardContext";
import TextArea from "../Component/InputField/TextAreas";

const UIPlanning = () => {
  const navigate = useNavigate();

  const {
    wizardData,
    submitAll,
    setSubmitAll,
    selectedComponents,
    setSelectedComponents,
    setPage,
    page,
    currentCount,
    setCurrentCount,
  } = useContext(WizardContext);

  //console.log("context se hai");
  //console.log(wizardData);

  const { completeFormDataContext, } = useContext(WizardContext);

  console.log("from context");
  console.log(completeFormDataContext);

  const [completeFormData, setCompleteFormState] = useState({
    textBoxes: [],
    checkboxes: [],
    dropdowns: [],
    multiSelectOptions: [],
    radioButtons: [],
  });

  const handleOptionClick = (option) => {
    console.log("sssssss");
    switch (option) {
      case "TextBoxes":
        console.log("SSSSSS", selectedComponents);
        setSelectedComponents([
          ...selectedComponents,
          <TextBoxes
            key={selectedComponents.length}
            uniqueId={selectedComponents.length}
            //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
          />,
        ]);
        console.log("SSSSSS");
        break;

      case "CheckboxComponent":
        setSelectedComponents([
          ...selectedComponents,
          <CheckboxComponent
            key={selectedComponents.length}
            uniqueId={selectedComponents.length}
            //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
          />,
        ]);
        break;

      case "DropdownComponent":
        setSelectedComponents([
          ...selectedComponents,
          <Dropdown
            setCompleteFormState={setCompleteFormState}
            completeFormData={completeFormData}
            key={selectedComponents.length}
            onRemove={() => handleRemoveComponent(selectedComponents.length)}
          />,
        ]);
        break;

      case "MultiSelectOptionComponent":
        setSelectedComponents([
          ...selectedComponents,
          <MultiSelectOption
            key={selectedComponents.length}
            uniqueId={selectedComponents.length}
            //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
          />,
        ]);
        break;

      case "RadioButtonComponent":
        setSelectedComponents([
          ...selectedComponents,
          <RadioButton
            key={selectedComponents.length}
            uniqueId={selectedComponents.length}
            //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
          />,
        ]);

        break;
      case "TextAreaButtonComponent":
        setSelectedComponents([
          ...selectedComponents,
          <TextArea
            key={selectedComponents.length}
            uniqueId={selectedComponents.length}
            //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
          />,
        ]);

        break;

      default:
        break;
    }
  };

  const handleRemoveComponent = (index) => {
    const updatedComponents = [...selectedComponents];
    updatedComponents.splice(index, 1);
    setSelectedComponents(updatedComponents);

    // const RemainingData = Object.entries(completeFormDataContext);
    // console.log(RemainingData);

    
  };
  const handleRemoveAllComponent = () => {
    if (selectedComponents.length > 0) {
      const updatedComponents = [...selectedComponents];
      updatedComponents.splice(0, selectedComponents.length);
      setSelectedComponents(updatedComponents);
    } else {
      console.log("nothing is there");
    }
  };

  //passing data by navigate and location
  const handlePreview = () => {
    //navigate('/preview',{ state: { completeFormData: completeFormData } })
    navigate("/preview");
  };

  console.log("Form State:", completeFormDataContext);

  const handleNextPage = () => {
    if (currentCount == wizardData.totalSteps) {

      alert("over");
    } else {
      setPage(page + 1);
      setCurrentCount(currentCount + 1);
      console.log(page);
      handleRemoveAllComponent();
    }
  };

  const handlePrevPage = () => {
    console.log("open page1 edit");
    if (currentCount > 1) {
      setCurrentCount(currentCount - 1);
      handleRemoveAllComponent();
    } else {
      alert("negative");
    }
  };

  const handleSubmitAll = () => {
    //Api caal
    //setSubmitAll(submitAll => submitAll+1);
    //console.log(submitAll);
    handleRemoveAllComponent()
  };

  // useEffect(()=>{
  //   console.log(selectedComponents);
  // },[selectedComponents])


  useEffect(()=>{
    const RemainingData = Object.entries(completeFormDataContext).slice(currentCount,1)
    console.log("left data",RemainingData);
console.log("typeof remaiinshdjsguav",typeof(RemainingData));
     
  })

  useEffect(() => {
    if (
      Object.keys(completeFormDataContext).includes(currentCount.toString())
    ) {
      //console.log('consoled');
      const filteredData = Object.values(
        completeFormDataContext?.[currentCount]
      )?.filter((e) => {
        return e.page === currentCount;
      });
      console.log("this is filtered data", filteredData);

      const updateSelectedComponents = filteredData.map((filterData) => {
        switch (filterData.type) {
          case "textbox":
            return (
              <TextBoxes
                key={filterData.Uid}
                uniqueId={filterData.Uid}
                question={filterData.question}
                options={filterData.options}

                //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
              />
            );

          case "checkbox":
            return (
              <CheckboxComponent
                key={selectedComponents.length}
                uniqueId={selectedComponents.length}
                question={filterData.question}
                options={filterData.options}

                //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
              />
            );

          case "radio":
            return (
              <RadioButton
                key={selectedComponents.length}
                uniqueId={selectedComponents.length}
                question={filterData.question}
                options={filterData.options}
                //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
              />
            );

          case "mcq":
            return (
              <MultiSelectOption
                key={selectedComponents.length}
                uniqueId={selectedComponents.length}
                question={filterData.question}
                options={filterData.options}
                //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
              />
            );

          case "textarea":
            return (
              <TextArea
                key={selectedComponents.length}
                uniqueId={selectedComponents.length}
                question={filterData.question}
                textDescription={filterData.textDescription}
                //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
              />
            );

          default:
            break;
        }
      });
      //console.log('updatedComponent: ', updateSelectedComponents)
      setSelectedComponents([...updateSelectedComponents]);
      // }
    } else {
      console.log("page not found");
    }
  }, [currentCount]);

  const handleFinalSubmit = ()=>{
   
   const combinedObject = {...wizardData,finalData:completeFormDataContext};
   console.log("final data for backend");
   console.log(combinedObject);
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="uiContainer" style={{ position: "sticky", top: 0 }}>
          <h4>Step {currentCount}</h4>
          <h2>Select a Form Element</h2>
          <div className="UiWrapper">
            <Button
              variant="contained"
              color="success"
              onClick={() => handleOptionClick("TextBoxes")}
            >
              Textbox
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleOptionClick("CheckboxComponent")}
            >
              Checkbox
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleOptionClick("DropdownComponent")}
            >
              Dropdown
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleOptionClick("MultiSelectOptionComponent")}
            >
              MultiSelect Option
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleOptionClick("RadioButtonComponent")}
            >
              Radio Button
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={() => handleOptionClick("TextAreaButtonComponent")}
            >
              Text Area
            </Button>
          </div>
          <Button variant="contained" color="success"  onClick={handleNextPage}>
          Next
          </Button>
          <Button variant="contained" color="success" onClick={handlePrevPage}>
          Prev
          </Button>
          <Button variant="contained" color="success" onClick={handlePreview} disabled={currentCount < wizardData.totalSteps}>
            Preview
          </Button>

          <Button variant="contained" color="success" disabled={currentCount < wizardData.totalSteps} onClick={handleFinalSubmit}>
            Final Submit
          </Button>
          

          <Button variant="contained" color="success" onClick={handleSubmitAll}>
            Submit
          </Button>
          {/* //getData={getAccordionDetailsUtilityClass()} */}
        </div>

        <div className="renderedContainer">
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            {wizardData.title}
          </h1>
          {console.log("selectedComponent:", selectedComponents)}
          {console.log("typeof ", typeof selectedComponents)}
          {selectedComponents.map((Component, index) => (
            <div
              key={index}
              style={{ marginBottom: "20px", position: "relative" }}
            >
              <h1>{index}</h1>
              {{ ...Component, props: { ...Component.props, index } }}
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveComponent(index)}
                style={{ position: "absolute", top: 100, right: 0 }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UIPlanning;

// import React, { useState,useContext } from 'react';
// import TextBoxes from '../Component/InputField/TextBoxes';
// import CheckboxComponent from '../Component/InputField/Checkbox';
// import Dropdown from '../Component/InputField/Dropdown';
// import MultiSelectOption from '../Component/InputField/MultiSelectOption';
// import RadioButton from '../Component/InputField/RadioButton';
// import Button from '@mui/material/Button';
// import '../CSS/UIPlanning.css';
// import {  useNavigate } from 'react-router-dom';

// import {WizardContext} from "../Context/WizardContext"
// import TextArea from '../Component/InputField/TextAreas';

// const UIPlanning = () => {

//   const navigate = useNavigate();

//   const {wizardData} = useContext(WizardContext)
//   const [currentCount,setCurrentCount] = useState(1);

//   console.log("context se hai");
//   console.log(wizardData);

//   const {completeFormDataContext} = useContext(WizardContext);

//   console.log("from context");
//   console.log(completeFormDataContext);

//   const [completeFormData, setCompleteFormState] = useState({
//     textBoxes: [],
//     checkboxes: [],
//     dropdowns: [],
//     multiSelectOptions: [],
//     radioButtons: []
//   });

//   const [selectedComponents, setSelectedComponents] = useState([]);

//   const handleOptionClick = (option) => {
//     switch (option) {

//       case 'TextBoxes':
//         setSelectedComponents([...selectedComponents,
//         <TextBoxes
//           key={selectedComponents.length}
//           onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
//           />]);
//         break;

//       case 'CheckboxComponent':
//         setSelectedComponents([...selectedComponents,
//         <CheckboxComponent
//            key={selectedComponents.length}
//            onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
//            />]);
//         break;

//       case 'DropdownComponent':
//         setSelectedComponents([...selectedComponents,
//         <Dropdown
//           setCompleteFormState = {setCompleteFormState}
//           completeFormData={completeFormData}
//           key={selectedComponents.length}
//           onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
//         />]);
//         break;

//       case 'MultiSelectOptionComponent':
//         setSelectedComponents([...selectedComponents,
//         <MultiSelectOption
//            key={selectedComponents.length}
//            onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
//           />]);
//         break;

//       case 'RadioButtonComponent':
//         setSelectedComponents([...selectedComponents,
//         <RadioButton
//           key={selectedComponents.length}
//           onRemove = {()=>handleRemoveComponent(selectedComponents.length)}

//         />]);

//         break;
//       case 'TextAreaButtonComponent':
//         setSelectedComponents([...selectedComponents,
//         <TextArea
//           key={selectedComponents.length}
//           onRemove = {()=>handleRemoveComponent(selectedComponents.length)}

//         />]);

//       break;

//       default:
//         break;
//     }
//   };

//   const handleRemoveComponent = (index) => {
//     const updatedComponents = [...selectedComponents];
//     updatedComponents.splice(index, 1);
//     setSelectedComponents(updatedComponents);
//   };

// //passing data by navigate and location
//   const handlePreview = ()=>{

//     //navigate('/preview',{ state: { completeFormData: completeFormData } })
//     navigate('/preview');
//   }

//   console.log('Form State:', completeFormDataContext);

//   const handleNextPage = () =>{

//     if(currentCount == wizardData.totalSteps){
//       alert("over")
//     }else{
//       setCurrentCount(currentCount+1)
//     }

//   }

//   const handleSubmitAll = () => {
//     console.log("hello");
//     console.log(selectedComponents);
//   }

//   return (
//     <>
//       <div style={{ display: 'flex' }}>

//       <div className='uiContainer' style={{ position: 'sticky', top: 0 }}>
//         <h4>Step {currentCount}</h4>
//         <h2>Select a Form Element</h2>
//         <div className='UiWrapper'>
//           <Button variant="contained" color="success"
//                   onClick={() => handleOptionClick('TextBoxes')}
//                   >
//             Textbox
//           </Button>
//           <Button variant="contained" color="success"
//                   onClick={() => handleOptionClick('CheckboxComponent')}
//                   >
//             Checkbox
//           </Button>
//           <Button variant="contained" color="success"
//                   onClick={() => handleOptionClick('DropdownComponent')}
//                   >
//             Dropdown
//           </Button>
//           <Button variant="contained" color="success"
//                   onClick={() => handleOptionClick('MultiSelectOptionComponent')}
//                   >
//             MultiSelect Option
//           </Button>
//           <Button variant="contained" color="success"
//                   onClick={() => handleOptionClick('RadioButtonComponent')}
//                   >
//             Radio Button
//           </Button>

//           <Button variant="contained" color="success"
//                   onClick={() => handleOptionClick('TextAreaButtonComponent')}
//                   >
//             Text Area
//           </Button>
//         </div>
//         <Button variant="contained" color="success"
//                   onClick={handlePreview}
//                   >
//             Preview
//           </Button>
//           <button onClick={handleNextPage}>Next</button>

//           <Button variant="contained" color="success"
//                   onClick={handleSubmitAll}
//                   >
//             Submit
//           </Button>

//       </div>

//       <div className='renderedContainer'>
//          <h1 style={{display:'flex',justifyContent:'center',marginBottom:'30px'}}>{wizardData.title}</h1>
//         {selectedComponents.map((Component, index) => (
//           <div key={index} style={{ marginBottom: '20px', position: 'relative' }}>
//             {Component}
//             <Button
//               variant="contained"
//               color="error"
//               onClick={() => handleRemoveComponent(index)}
//               style={{ position: 'absolute', top: 100, right: 0 }}
//             >
//               Remove
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>

//     </>
//   );
// };

// export default UIPlanning;
