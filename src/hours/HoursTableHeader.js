import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { columns } from "./hoursConstants";

const HoursTableHead = ({ expandColumns }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                {columns.map(column => {
                    if (!column.enabled && !expandColumns) {
                        return null;
                    }
                    return (
                        <TableCell align="right" key={"header-" + column.id}>
                            {column.description}
                        </TableCell>
                    );
                })}
                <TableCell align="right">Toelichting</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default HoursTableHead;
