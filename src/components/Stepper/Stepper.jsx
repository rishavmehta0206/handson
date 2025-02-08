import React, { useState } from 'react';
import './Stepper.css';

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const NUMBER_OF_STEPS = 5;

  const nextStep = () => {
    setCurrentStep(prev => prev < NUMBER_OF_STEPS - 1 ? prev + 1 : prev);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev > 0 ? prev - 1 : prev);
  };

  return (
    <div className="stepper-container">
      <div className="steps-wrapper">
        {Array.from({ length: NUMBER_OF_STEPS }).map((_, index) => (
          <Step
            key={index}
            index={index}
            currentStep={currentStep}
            isLastStep={index === NUMBER_OF_STEPS - 1}
          />
        ))}
      </div>

      <div className="button-container">
        <span
          onClick={prevStep}
          disabled={currentStep === 0}
          className="stepper-button"
        >
          Previous
        </span>
        <span
          onClick={nextStep}
          disabled={currentStep === NUMBER_OF_STEPS - 1}
          className="stepper-button"
        >
          Next
        </span>
      </div>
    </div>
  );
};

const Step = ({ index, currentStep, isLastStep }) => {
  const getStepClass = () => {
    if (currentStep === index || currentStep > index) return "step-circle active";
    return "step-circle";
  };

  return (
    <div className="step">
      <div className={getStepClass()}>
        {index + 1}
      </div>
      {!isLastStep && (
        <div className={`step-line ${currentStep > index ? 'completed' : ''}`} />
      )}
    </div>
  );
};

export default Stepper;