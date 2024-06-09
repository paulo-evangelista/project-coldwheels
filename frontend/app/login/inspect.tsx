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
        <div>
            <div>
                <h1>INSPECT</h1>
                <br />
                <input
                    type="text"
                    value={inspectData}
                    onChange={(e) => setInspectData(e.target.value)}
                />
                <button onClick={() => inspectCall(inspectData)}>
                    Send
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Active Epoch Index</th>
                        <th>Curr Input Index</th>
                        <th>Status</th>
                        <th>Exception Payload</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{metadata.metadata ? metadata.metadata.active_epoch_index : ""}</td>
                        <td>{metadata.metadata ? metadata.metadata.current_input_index : ""}</td>
                        <td>{metadata.status}</td>
                        <td>{metadata.exception_payload ? ethers.utils.toUtf8String(metadata.exception_payload) : ""}</td>
                    </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                    {reports.length === 0 && (
                        <tr>
                            <td colSpan={4}>no reports</td>
                        </tr>
                    )}
                    {reports.map((n: any) => (
                        <tr key={`${n.payload}`}>
                            <td>{ethers.utils.toUtf8String(n.payload)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
