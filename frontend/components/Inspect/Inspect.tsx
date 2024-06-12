import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

export const Inspect: React.FC = () => {
    const [inspectData, setInspectData] = useState<string>("");
    const [reports, setReports] = useState<string[]>([]);
    const [metadata, setMetadata] = useState<any>({});

    const inspectCall = async (str: string) => {
        let apiURL = "http://localhost:8080/inspect";

        try {
            let response;
            response = await axios.post(apiURL, inspectData);

            const data = response.data;
            setReports(data.reports);
            setMetadata({ metadata: data.metadata, status: data.status, exception_payload: data.exception_payload });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
<div className="m-5 font-sans">
            <div>
                Inspect:{" "}
                <input
                    type="text"
                    value={inspectData}
                    onChange={(e) => setInspectData(e.target.value)}
                    className="w-1/2 p-2 rounded border border-gray-300 mr-2 ml-2"
                />
                <button
                    onClick={() => inspectCall(inspectData)}
                    className="py-2 px-5 my-2 mx-2 border-none rounded bg-black text-white cursor-pointer hover:bg-gray-500"
                >
                    Send Inspect
                </button>
            </div>

            <table className="w-full border-collapse mt-5">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 p-2">Active Epoch Index</th>
                        <th className="border border-gray-300 p-2">Curr Input Index</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Exception Payload</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="even:bg-gray-100">
                        <td className="border border-gray-300 p-2">{metadata.metadata ? metadata.metadata.active_epoch_index : ""}</td>
                        <td className="border border-gray-300 p-2">{metadata.metadata ? metadata.metadata.current_input_index : ""}</td>
                        <td className="border border-gray-300 p-2">{metadata.status}</td>
                        <td className="border border-gray-300 p-2">{metadata.exception_payload ? ethers.utils.toUtf8String(metadata.exception_payload) : ""}</td>
                    </tr>
                </tbody>
            </table>

            <table className="w-full border-collapse mt-5">
                <tbody>
                    {reports.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center p-5 text-lg">no reports</td>
                        </tr>
                    )}
                    {reports.map((n: any) => (
                        <tr key={`${n.payload}`} className="even:bg-gray-100">
                            <td className="border border-gray-300 p-2">{ethers.utils.toUtf8String(n.payload)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
