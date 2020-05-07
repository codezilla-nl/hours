import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import IDay from "../../common/interfaces/IDay";

import * as HoursConstants from "../hours-constants/hoursConstants.component";

interface IProps {
    expandColumns: boolean;
    days: IDay[];
}

const columns = HoursConstants.columns;

const HoursFooter = ({ expandColumns, days }: IProps) => {
    const getTotal = (column: string) => {
        const values = days.map((x) => x[column]);
        return values.reduce((total, currentValue) => {
            return Number(total) + Number(currentValue);
        });
    };

    if (!days.length) return null;

    return (
        <TableFooter>
            <TableRow>
                <TableCell> Totaal</TableCell>
                <TableCell></TableCell>
                {columns.map((column) => {
                    if (!column.enabled && !expandColumns) {
                        return null;
                    }
                    return (
                        <TableCell align="right" key={"footer-" + column.id}>
                            {getTotal(column.id)}
                        </TableCell>
                    );
                })}
                <TableCell align="right"></TableCell>
            </TableRow>
        </TableFooter>
    );
};

export default HoursFooter;
