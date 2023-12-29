import React, { useEffect, useState } from "react";
import "../CSS/template.css";
import axios from "axios";
import CreateCard from "../Common/CreateCard";
import CardComp from "../Common/CardComp";

const Template = () => {
  const [wizardId, setWizardId] = useState([]);

  useEffect(() => {
    const getDataFrombackend = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getData");
        console.log("json data- ", res.data);
        setWizardId(res.data);
      } catch (error) {
        console.log("error in fetching data", error);
      }
    };

    getDataFrombackend();
  }, []);

  return (
    <div className="templateLayout">
      <div className="templateWrapper">
        <CreateCard title="Create New Wizard" />

        {wizardId.map((wizard, i) => (
          <div key={i}>
            {/* {wizard.id} */}
            <CardComp
              key={wizard.id}
              title={`Go To Wizard ${wizard.id}`}
              id={wizard.id}
            />
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Template;
