// 'use client'
// import React, { useState } from "react";
// import { ethers } from 'ethers';
// import { advanceDAppRelay, advanceInput } from 'cartesi-client';

// interface IInputProps {
//   dappAddress: string
// }

// const Input: React.FC<IInputProps> = (props) => {
//   const [input, setInput] = useState<string>("");
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const dappAddress = props.dappAddress;

//   const addInput = async () => {
//       console.log("adding input", input);
//       const signer = await provider.getSigner();
//       console.log("signer and input is ", signer, input);
//       advanceInput(signer, dappAddress, input);
//   };

//   const sendAddress = async () => {
//       console.log("sending dapp address");
//       const signer = await provider.getSigner();
//       advanceDAppRelay(signer, dappAddress);
//   }

//   return (
//     <div className="text-center">
//       <main className="bg-white p-5 rounded-lg shadow-md mt-5">
//           <div>
//             Input:{" "}
//             <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="p-2 rounded border border-gray-300 mr-2 ml-2"
//             />
//             <button
//               onClick={() => addInput()}
//               className="py-2 px-5 my-2 mx-2 border-none rounded bg-black text-white cursor-pointer hover:bg-gray-500"
//             >
//               Send Advance
//             </button>
//           </div>
//       </main>
//     </div>
//   );
// };

// export default Input;
