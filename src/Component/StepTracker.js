import React from 'react';
import '../CSS/steptracker.css'

const StepTracker = ({ totalSteps, currentStep }) => {
  const totalsteps = [];
  for (let i = 1; i <= totalSteps; i++) {
    totalsteps.push(
      <div key={i} className={currentStep === i ? 'activeStep' : 'inactiveStep'}>
        {i}
      </div>
    );
  }

  return (
  <>
  <div className={totalSteps < 17 ?'stepTracker':'stepTracker1'}>{totalsteps}</div>
  </>
  );
};

export default StepTracker;
