// import { getReports } from "cartesi-client";
// import React from "react";
// import { useEffect, useState } from "react";

// let apiURL = "http://localhost:8080/graphql";
// export const Report: React.FC = () => {
//     const [reports, setReports] = useState<any>([])

//     const getAllReports = async () => {
//         const Reports = await getReports(apiURL);
//         setReports(Reports);
//     }

//     useEffect(() => {
//         getAllReports();
//     }, [apiURL])

//     return (
//         <div className="m-5 font-sans">
//             <table className="w-full border-collapse">
//                 <thead className="bg-gray-200">
//                     <tr>
//                         <th className="border border-gray-300 p-2">Input Index</th>
//                         <th className="border border-gray-300 p-2">Report Index</th>
//                         <th className="border border-gray-300 p-2">Payload</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {reports.length === 0 && (
//                         <tr>
//                             <td colSpan={3} className="text-center p-5 text-lg">no Reports</td>
//                         </tr>
//                     )}

//                     {reports.map((n: any) => (
//                         <tr key={`${n.input.index}-${n.index}`} className="even:bg-gray-100">
//                             <td className="border border-gray-300 p-2">{n.input.index}</td>
//                             <td className="border border-gray-300 p-2">{n.index}</td>
//                             <td className="border border-gray-300 p-2">{n.payload}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <button
//                 onClick={() => getAllReports()}
//                 className="py-2 px-5 my-2 mx-2 bg-black text-white border-none p-2 cursor-pointer text-base rounded mt-2 hover:bg-gray-500"
//             >
//                 Reload Reports
//             </button>
//         </div>
//     );
// };
