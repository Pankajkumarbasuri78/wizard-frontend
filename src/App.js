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

import Preview from "./Pages/Preview";
import { WizardContextProvider } from "./Context/WizardContext";
import DisplayPage from "./Pages/DisplayPage";
const App = () => {
  return (
    <>
    <WizardContextProvider>
      <Routes>

        
        <Route path="/" element={<HomePage/>}/>
        <Route path="/wizard-creation" element={<WizardCreation/>}/>
        <Route path="/ui" element={<UIPlanning/>}/>
        <Route path="/ui/:userId" element={<UIPlanning/>}/>


        
        {/* <Route path="/radio" element={<RadioButton/>}/>
        <Route path="/checkbox" element={<CheckBox/>}/>
        <Route path="/textbox" element={<TextBoxes/>}/>
        <Route path="/MultiSelect" element={<MultiSelectOption/>}/>
        <Route path="/dropdown" element={<Dropdown/>}/> */}
        <Route path="/displayPage" element={<DisplayPage/>}/>
        <Route path="/displayPage/:userId" element={<DisplayPage/>}/>
        <Route path="/preview" element={<Preview/>}/>
        <Route path="/preview/:userId" element={<Preview />} />

      </Routes>
      </WizardContextProvider>
    </>
  );
};

export default App;



