import { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './formAnimations.css';

const RegisterIncidentForm = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  return (
    <div className="w-[400px] p-6 border border-gray-300 rounded-lg shadow-sm">
      <SwitchTransition>
        <CSSTransition
          key={step}
          timeout={300}
          classNames="fade"
        >
          <div>
            {step === 0 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Register Incident</h2>
                <div className="mb-4">
                  <label htmlFor="plate" className="block text-sm font-medium text-gray-700 mb-1">
                    Plate:
                  </label>
                  <input
                    type="text"
                    id="plate"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Register Incident</h2>
                <div className="mb-4">
                  <label htmlFor="plate" className="block text-sm font-medium text-gray-700 mb-1">
                    Plate:
                  </label>
                  <input
                    type="text"
                    id="plate"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Register Incident</h2>
                {/* Adicione mais campos aqui se necessário */}
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default RegisterIncidentForm;
