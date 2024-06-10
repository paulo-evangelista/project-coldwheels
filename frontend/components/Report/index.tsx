import { getReports } from "cartesi-client";
import React from "react";
import { useEffect, useState } from "react";
import { Container, ReloadButton, Table, TableHeader, TableRow, TableCell, NoDataCell } from "./style";

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
        <Container>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Input Index</TableCell>
                        <TableCell>Report Index</TableCell>
                        <TableCell>Payload</TableCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {reports.length === 0 && (
                        <TableRow>
                            <NoDataCell colSpan={4}>no Reports</NoDataCell>
                        </TableRow>
                    )}

                    {reports.map((n: any) => (
                        <TableRow key={`${n.input.index}-${n.index}`}>
                            <TableCell>{n.input.index}</TableCell>
                            <TableCell>{n.index}</TableCell>
                            <TableCell>{n.payload}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            <ReloadButton onClick={() => getAllReports()}>
                Reload
            </ReloadButton>
        </Container>
    );
};