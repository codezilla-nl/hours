import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { columns } from "./hoursConstants";

const HoursTableHead = ({ expandColumns }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                {columns.map((column) => {
                    if (!column.enabled && !expandColumns) {
                        return null;
                    }
                    return (
                        <TableCell key={"header-" + column.id} padding="none">
                            {column.description}
                        </TableCell>
                    );
                })}
                <TableCell>Toelichting</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default HoursTableHead;
