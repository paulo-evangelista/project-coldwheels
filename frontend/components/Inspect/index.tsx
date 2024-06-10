import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { Container, Title, InputField, SendButton, Table, TableHeader, TableRow, TableCell, NoDataCell } from "./style";

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
        <Container>
            <div>
                <Title>INSPECT</Title>
                <br />
                <InputField
                    type="text"
                    value={inspectData}
                    onChange={(e) => setInspectData(e.target.value)}
                />
                <SendButton onClick={() => inspectCall(inspectData)}>
                    Send
                </SendButton>
            </div>
            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Active Epoch Index</TableCell>
                        <TableCell>Curr Input Index</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Exception Payload</TableCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    <TableRow>
                        <TableCell>{metadata.metadata ? metadata.metadata.active_epoch_index : ""}</TableCell>
                        <TableCell>{metadata.metadata ? metadata.metadata.current_input_index : ""}</TableCell>
                        <TableCell>{metadata.status}</TableCell>
                        <TableCell>{metadata.exception_payload ? ethers.utils.toUtf8String(metadata.exception_payload) : ""}</TableCell>
                    </TableRow>
                </tbody>
            </Table>

            <Table>
                <tbody>
                    {reports.length === 0 && (
                        <TableRow>
                            <NoDataCell colSpan={4}>no reports</NoDataCell>
                        </TableRow>
                    )}
                    {reports.map((n: any) => (
                        <TableRow key={`${n.payload}`}>
                            <TableCell>{ethers.utils.toUtf8String(n.payload)}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
