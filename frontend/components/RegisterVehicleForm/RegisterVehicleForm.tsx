import { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { ethers } from "ethers";
import { advanceInput } from "cartesi-client";
import './formAnimations.css';

interface Props {
  dappAddress: string;
}

const RegisterVehicleForm: React.FC<Props> = (props) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const dappAddress = props.dappAddress;
  const [step, setStep] = useState(0);
  const [plate, setPlate] = useState("");
  const [kindId, setKindId] = useState("");
  const [odometer, setOdometer] = useState("");
  const [image, setImage] = useState("");

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
  };

  const registerVehicle = async () => {
    const input = {
      plate,
      kindId,
      odometer,
      image,
    };

    console.log("adding input", input);
    const signer = await provider.getSigner();
    console.log("signer and input is ", signer, input);
    advanceInput(signer, dappAddress, input);
  };

  return (
    <div className="w-[400px] p-6 border border-gray-300 rounded-lg shadow-sm">
      <SwitchTransition>
        <CSSTransition
          key={step}
          timeout={300}
          classNames="form-animation"
        >
          <div>
            {step === 0 && (
            <>
                <h2 className="text-xl font-semibold mb-4">Register Vehicle</h2>
                <div className="mb-4">
                  <label htmlFor="plate" className="block text-sm font-medium text-gray-700 mb-1">
                    Plate:
                  </label>
                  <input
                    type="text"
                    id="plate"
                    value={plate}
                    onChange={handleInputChange(setPlate)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Next
                </button>
            </>
            )}
            {step === 1 && (
            <>
                <h2 className="text-xl font-semibold mb-4">Register Vehicle</h2>
                <div className="mb-4">
                    <label htmlFor="kindId" className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Kind:
                    </label>
                    <input
                    type="text"
                    id="kindId"
                    value={kindId}
                    onChange={handleInputChange(setKindId)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    onClick={handleNext}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Next
                </button>
            </>
            )}
            {step === 2 && (
            <>
                <h2 className="text-xl font-semibold mb-4">Register Vehicle</h2>
                <div className="mb-4">
                    <label htmlFor="odometer" className="block text-sm font-medium text-gray-700 mb-1">
                    Odometer:
                    </label>
                    <input
                    type="text"
                    id="odometer"
                    value={odometer}
                    onChange={handleInputChange(setOdometer)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    onClick={handleNext}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Next
                </button>
            </>                
            )}
            {step === 3 && (
            <>
                <h2 className="text-xl font-semibold mb-4">Register Vehicle</h2>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Image:
                    </label>
                    <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={handleInputChange(setImage)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    onClick={registerVehicle}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Register
                </button>
            </>                
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default RegisterVehicleForm;
