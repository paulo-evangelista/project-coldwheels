import { getReports } from "cartesi-client";
import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

let apiURL = "http://localhost:8080/graphql";
export const Report: React.FC = () => {
    const [reports, setReports] = useState<any>([])

    const getAllReports = async () => {
        const Reports = await getReports(apiURL);
        setReports(Reports);
    }

    useEffect(() => {
        getAllReports();
    }, [apiURL])

    return (
        <div>
            <button onClick={() => getAllReports()}>
                Reload
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Input Index</th>
                        <th>Report Index</th>
                        {/* <th>Input Payload</th> */}
                        <th>Payload</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length === 0 && (
                        <tr>
                            <td colSpan={4}>no Reports</td>
                        </tr>
                    )}

                    {reports.map((n: any) => (
                        <tr key={`${n.input.index}-${n.index}`}>
                            <td>{n.input.index}</td>
                            <td>{n.index}</td>
                            {/* <td>{n.input.payload}</td> */}
                            <td>{n.payload}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};