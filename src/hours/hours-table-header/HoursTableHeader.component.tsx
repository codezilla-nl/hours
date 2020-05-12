import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { columns } from "../hours-constants/hoursConstants.component";

interface IProps {
    expandColumns: boolean;
}

const HoursTableHead = ({ expandColumns }: IProps) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
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
