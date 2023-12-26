import React from "react";
import "../CSS/template.css";
import axios from 'axios';
import CreateCard from "../Common/CreateCard";
import CardComp from "../Common/CardComp";

const Template = () => {
  return (
    <div className="templateLayout">
      <div className="templateWrapper">
        <CreateCard title ='Create New Wizard'/>
        <CardComp title='Go To Existing Wizard' />
        <CardComp title='Go To Existing Wizard' />
        <CardComp title='Go To Existing Wizard' />
      </div>
    </div>
  );
};

export default Template;
