import { createContext, useState } from "react";

const WizardContext = createContext();

const WizardContextProvider = ({ children }) => {
  //wizard creation
  const [wizardData, setWizardData] = useState({
    title: "",
    description: "",
    totalSteps: "",
  });

  //UId
  const [id,setId] = useState(1);

  // const [completeFormDataContext,setCompleteFormDataContext] = useState({
  //   textBoxes: [],
  //   checkboxes: [],
  //   dropdowns: [],
  //   multiSelectOptions: [],
  //   radioButtons: [],
  //   textArea:[]
  // });

  const [completeFormDataContext, setCompleteFormDataContext] = useState({
    // 1: {
    //   0: {
    //     page: 1,
    //     type: "textbox",
    //     question: "what is your name initail",
    //     options: ["op1", "op2"],
    //     Uid: 0,
    //   },
    // },
    // 2: {
    //   0: {
    //     page: 2,
    //     type: "textbox",
    //     question: "what is your name initail2",
    //     options: ["op1", "op2"],
    //     Uid: 1,
    //   },
    // },
  });
  // page:{
  //   uid:{
  //     type:'textbox',
  //     question: '',
  //     options: [],
  //   }
  // }

  const [globalSeq, setGlobalSeq] = useState(1);

  const [page, setPage] = useState(1);

  const [submitAll, setSubmitAll] = useState(0);

  const [selectedComponents, setSelectedComponents] = useState([]);

  const [currentCount, setCurrentCount] = useState(1);

  const [isValid,setIsValid] = useState(false);

  const [userNAME,setUserNAME] = useState('');

  // const userId

  

  const contextValue = {
    wizardData,
    setWizardData,
    completeFormDataContext,
    setCompleteFormDataContext,
    globalSeq,
    setGlobalSeq,
    submitAll,
    setSubmitAll,
    selectedComponents,
    setSelectedComponents,
    page,
    setPage,
    currentCount,
    setCurrentCount,
    id,setId,
    isValid,setIsValid,
    userNAME,setUserNAME
    
  };

  return (
    <WizardContext.Provider value={contextValue}>
      {children}
    </WizardContext.Provider>
  );
};

export { WizardContext, WizardContextProvider };
