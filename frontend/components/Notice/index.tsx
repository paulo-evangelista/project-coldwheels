import React from "react";
import { getNotices } from "cartesi-client";
import { useState, useEffect } from "react";
import { Container, ReloadButton, Table, TableHeader, TableRow, TableCell, NoDataCell } from "./style";

let apiURL = "http://localhost:8080/graphql";
export const Notice: React.FC = () => {
    const [notices, setNotices] = useState<any>([])

    const getAllNotices = async () => {
        const Notices = await getNotices(apiURL);
        setNotices(Notices);
        console.log("notices are ", Notices);
    }

    useEffect(() => {
        getAllNotices();
    }, [apiURL])

    return (
        <Container>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Input Index</TableCell>
                        <TableCell>Notice Index</TableCell>
                        <TableCell>Payload</TableCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {notices.length === 0 && (
                        <TableRow>
                            <NoDataCell colSpan={4}>no notices</NoDataCell>
                        </TableRow>
                    )}

                    {notices.map((n: any) => (
                        <TableRow key={`${n.input.index}-${n.index}`}>
                            <TableCell>{n.input.index}</TableCell>
                            <TableCell>{n.index}</TableCell>
                            <TableCell>{n.payload}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            <ReloadButton onClick={() => getAllNotices()}>
                Reload
            </ReloadButton>
        </Container>
    );
};