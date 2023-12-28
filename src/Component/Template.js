import React, { useEffect, useState } from "react";
import "../CSS/template.css";
import axios from "axios";
import CreateCard from "../Common/CreateCard";
import CardComp from "../Common/CardComp";

const Template = () => {
  const [wizardId, setWizardId] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getData")
      .then((res) => {
        console.log("json data-", res.data);
        setWizardId(res.data);
        console.log("s", wizardId);
      })
      .catch((error) => {
        console.log("error in fetching data", error);
      });
  }, []);

  return (
    <div className="templateLayout">

      <div className="templateWrapper">
        <CreateCard title="Create New Wizard" />
        {wizardId.map((wizard,i) => (
          <div key={i}>
            {wizard.id}
          <CardComp
            key={wizard.id}
            title={`Go To Wizard ${wizard.id}`}
            id={wizard.id}
          />
          </div>
        ))}
        {/* <CardComp title="Go To Existing Wizard" />
        <CardComp title="Go To Existing Wizard" />
        <CardComp title="Go To Existing Wizard" /> */}
      </div>
    </div>
  );
};

export default Template;
