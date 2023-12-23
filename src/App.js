import React from "react";
import {Routes,Route} from "react-router-dom"
import HomePage from "./Pages/HomePage";
import WizardCreation from "./Component/WizardCreation";
// import RadioButton from "./Component/InputField/RadioButton";

import UIPlanning from "./Common/UIPlanning";
// import TextBoxes from "./Component/InputField/TextBoxes";
// import CheckBox from "./Component/InputField/Checkbox";
// import MultiSelectOption from "./Component/InputField/MultiSelectOption";
// import Dropdown from "./Component/InputField/Dropdown";
import DesignPage from "./Pages/DesignPage";
import Preview from "./Pages/Preview";
import { WizardContextProvider } from "./Context/WizardContext";
const App = () => {
  return (
    <>
    <WizardContextProvider>
      <Routes>

        
        <Route path="/" element={<HomePage/>}/>
        <Route path="/wizard-creation" element={<WizardCreation/>}/>
        <Route path="/ui" element={<UIPlanning/>}/>


        
        {/* <Route path="/radio" element={<RadioButton/>}/>
        <Route path="/checkbox" element={<CheckBox/>}/>
        <Route path="/textbox" element={<TextBoxes/>}/>
        <Route path="/MultiSelect" element={<MultiSelectOption/>}/>
        <Route path="/dropdown" element={<Dropdown/>}/> */}
        <Route path="/designPage" element={<DesignPage/>}/>
        <Route path="/preview" element={<Preview/>}/>
      </Routes>
      </WizardContextProvider>
    </>
  );
};

export default App;



