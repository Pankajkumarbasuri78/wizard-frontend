import React, {  useContext, useEffect } from "react";
import TextBoxes from "../Component/InputField/TextBoxes";
import CheckboxComponent from "../Component/InputField/Checkbox";
import Dropdown from "../Component/InputField/Dropdown";
import MultiSelectOption from "../Component/InputField/MultiSelectOption";
import RadioButton from "../Component/InputField/RadioButton";
import Button from "@mui/material/Button";
import "../CSS/UIPlanning.css";
import { useNavigate,useParams } from "react-router-dom";

import { WizardContext } from "../Context/WizardContext";
import TextArea from "../Component/InputField/TextAreas";

import UiNavbar from "./UiNavbar";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UIPlanning = () => {
  const {userId} = useParams();
  
  const navigate = useNavigate();

  const {
    wizardData,
    selectedComponents,
    setSelectedComponents,
    setPage,
    page,
    currentCount,
    setCurrentCount,
    id,
    isValid,
    completeFormDataContext, 
    setCompleteFormDataContext
  } = useContext(WizardContext);

  //console.log("context se hai");
  //console.log(wizardData);


  console.log("from context Completeformdata", completeFormDataContext);

  const handleOptionClick = (option) => {
    switch (option) {
      case "TextBoxes":
        // console.log("SSSSSS", selectedComponents);
        setSelectedComponents([
          ...selectedComponents,
          <TextBoxes
            key={selectedComponents.length}
            uniqueId={id}
          />,
        ]);

        break;

      case "CheckboxComponent":
        setSelectedComponents([
          ...selectedComponents,
          <CheckboxComponent
            key={selectedComponents.length}
            uniqueId={id}
            //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
          />,
        ]);
        break;

      case "DropdownComponent":
        setSelectedComponents([
          ...selectedComponents,
          <Dropdown
          key={selectedComponents.length}
          uniqueId={id}
            // onRemove={() => handleRemoveComponent(selectedComponents.length)}
          />,
        ]);
        break;

      case "MultiSelectOptionComponent":
        setSelectedComponents([
          ...selectedComponents,
          <MultiSelectOption
            key={selectedComponents.length}
            uniqueId={id}
            //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
          />,
        ]);
        break;

      case "RadioButtonComponent":
        setSelectedComponents([
          ...selectedComponents,
          <RadioButton
            key={selectedComponents.length}
            uniqueId={id}
            //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
          />,
        ]);

        break;
      case "TextAreaButtonComponent":
        setSelectedComponents([
          ...selectedComponents,
          <TextArea
            key={selectedComponents.length}
            uniqueId={id}
            //onRemove = {()=>handleRemoveComponent(selectedComponents.length)}
          />,
        ]);

        break;

      default:
        break;
    }
  };

  const handleRemoveComponent = (index, Uid) => {
    // console.log("1111111111111111", index);
    
    const updatedComponents = [...selectedComponents];
    updatedComponents.splice(index, 1);
    setSelectedComponents(updatedComponents);

    console.log("uniquiiDDDD", Uid);

    //remove data from completeFormDataContext
    setCompleteFormDataContext((prevContext) => {
      const updatedContext = { ...prevContext };
      const currentPageData = updatedContext[currentCount];

      console.log("currentPageDtaa", currentPageData);
      if (currentPageData && currentPageData[Uid]) {
        delete currentPageData[Uid];
        updatedContext[currentCount] = currentPageData;
      }

      return updatedContext;
    });
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

  // //passing data by navigate and location
  // const handlePreview = () => {
  //   //navigate('/preview',{ state: { completeFormData: completeFormData } })
  //   navigate("/preview");
  // };

  // //console.log("Form State:", completeFormDataContext);

  // const handleNextPage = () => {
  //   if (currentCount == wizardData.totalSteps) {
  //     alert("over");
  //   } else {
  //     setPage(page + 1);
  //     setCurrentCount(currentCount + 1);
  //     console.log(page);
  //     handleRemoveAllComponent();
  //   }
  // };

  // const handlePrevPage = () => {
  //   console.log("open page1 edit");
  //   if (currentCount > 1) {
  //     setCurrentCount(currentCount - 1);
  //     handleRemoveAllComponent();
  //   } else {
  //     alert("negative");
  //   }
  // };

    const handleSubmitAll = () => {
      if (isValid) {
        toast.success("Ready to go Next Page", {
          autoClose: 500,
          onClose: () => {
            setPage(page + 1);
            setCurrentCount(currentCount + 1);
            handleRemoveAllComponent();
          },
        });
      } else {
        console.log("validate karo");
        toast.warning("Give proper Validation!!!", {
          autoClose: 1000,
        });
      }
    };

  // useEffect(()=>{
  //   console.log(selectedComponents);
  // },[selectedComponents])

  // useEffect(() => {
  //   const RemainingData = Object.entries(completeFormDataContext).slice(
  //     currentCount,
  //     1
  //   );
  //   console.log("left data", RemainingData);
  //   console.log("typeof remaiinshdjsguav", typeof RemainingData);
  // });


  const handleFinalSubmit = () => {
    const combinedObject = { ...wizardData, completeFormDataContext };
    console.log("final data for backend");
    console.log(combinedObject);
    if(isValid){
    //old data
      if(userId){
        axios.post(`http://localhost:8080/saveData/${userId}`,combinedObject,{
          headers: {
            "Content-Type":"application/json",
          }
        })
        .then((res)=>{
          console.log(`Data is sent to the backend with id ${userId} `,res.data);
          const finalData = res.data;
          console.log("USERRRidddddddddddd",finalData.id);
          navigate(`/preview/${userId}`)
        })
        .catch((error)=>{
          console.error("Error sending data to the backend:", error.message);
        })
      }
    

      //new data
      else{
          axios.post("http://localhost:8080/saveData", combinedObject, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
                      console.log("Data sent to the backend successfully:", response.data);
                      const finalData = response.data;
                      console.log("idddddddddddd",finalData.id);
                      navigate(`/preview/${finalData.id}`)
              // navigate("/");
              alert("Data is send to backend, you can preview now")
            })
            .catch((error) => {
              console.error("Error sending data to the backend:", error.message);
            });
    }
  }
  else{
    // console.log("validate karo");
        toast.warning("Give proper Validation!!!", {
          autoClose: 1000,
        });
  }

    // navigate('/')
  };


  useEffect(() => {
    // console.log("aaaaaayyyyyyyaaaaaa");
    if (
      Object.keys(completeFormDataContext).includes(currentCount.toString())
    ) {
      //console.log('consoled');
      const filteredData = Object.values(completeFormDataContext?.[currentCount])?.filter((e) => {
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
                // options={filterData.options}
                answer={filterData.answer}
              />
            );
            case "textarea":
            return (
              <TextArea
                key={filterData.Uid}
                uniqueId={filterData.Uid}
                question={filterData.question}
                // textDescription={filterData.textDescription}
                answer={filterData.answer}
              />
            );

          case "checkbox":
            return (
              <CheckboxComponent
                key={filterData.Uid}
                uniqueId={filterData.Uid}
                question={filterData.question}
                options={filterData.options}
                answer={filterData.answer}

              />
            );

          case "radio":
            return (
              <RadioButton
                key={filterData.Uid}
                uniqueId={filterData.Uid}
                question={filterData.question}
                options={filterData.options}
                answer={filterData.answer}
              />
            );

          case "mcq":
            return (
              <MultiSelectOption
                key={filterData.Uid}
                uniqueId={filterData.Uid}
                question={filterData.question}
                options={filterData.options}
                answer={filterData.answer}
              />
            );

          
            case "dropdown":
            return (
              <Dropdown
                key={filterData.Uid}
                uniqueId={filterData.Uid}
                question={filterData.question}
                options={filterData.options}
                answer={filterData.answer}
              />
            );

          default:
            break;
        }
      });
      //console.log('updatedComponent: ', updateSelectedComponents)
      setSelectedComponents([...updateSelectedComponents]);
      
    } else {
      console.log("page not found");
    }
  }, [currentCount]);

  return (
    <>
      <div>
        <UiNavbar />
      </div>
      <div style={{ display: "flex" }}>
        <div className="uiContainer" style={{ position: "sticky", top: 0, gap: 20 }}>
          {/* <h4>Step {currentCount}</h4> */}
          <h2 style={{ padding: "10px" }}>Select a Form Element</h2>
          <div className="UiWrapper" style={{ paddingLeft: "40px", gap: "10px" }}>
            <Button
              variant="outlined"
              color="success"
              className="buttonClass"
              onClick={() => handleOptionClick("TextBoxes")}
            >
              Textbox
            </Button>
            <Button
              variant="outlined"
              color="success"
              className="buttonClass"
              onClick={() => handleOptionClick("CheckboxComponent")}
            >
              Checkbox
            </Button>
            <Button
              variant="outlined"
              color="success"
              className="buttonClass"
              onClick={() => handleOptionClick("DropdownComponent")}
            >
              Dropdown
            </Button>
            <Button
              variant="outlined"
              color="success"
              className="buttonClass"
              onClick={() => handleOptionClick("MultiSelectOptionComponent")}
            >
              MultiSelect Option
            </Button>
            <Button
              variant="outlined"
              color="success"
              className="buttonClass"
              onClick={() => handleOptionClick("RadioButtonComponent")}
            >
              Radio Button
            </Button>

            <Button
              variant="outlined"
              color="success"
              className="buttonClass"
              onClick={() => handleOptionClick("TextAreaButtonComponent")}
            >
              Text Area
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleSubmitAll}
              disabled={currentCount == wizardData.totalSteps}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="success"
              disabled={currentCount < wizardData.totalSteps}
              onClick={handleFinalSubmit}
            >
              Final Submit
            </Button>
          </div>
          
        </div>

        <div className="renderedContainer">
            
            <h1 style={{ display: "flex",justifyContent: "center",marginBottom: "30px"}}>
              {wizardData.title}
            </h1>

            {console.log("selectedComponent:", selectedComponents)}
            {/* {console.log("typeof ", typeof(selectedComponents))} */}

            {selectedComponents.map((Component, index) => (
              <div key={index} style={{ marginBottom: "20px", position: "relative" }}>
                {/* <h1>{index}</h1> */}
                {{ ...Component, props: { ...Component.props, index } }}
                {/* {console.log("comccccccc",Component)} */}
                
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => handleRemoveComponent(index, Component.props.uniqueId)}
                  style={{ position: "absolute", top: 100, right: 0 }}
                >
                  Delete
                </Button>
              </div>
            ))}
        </div>
        
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default UIPlanning;
