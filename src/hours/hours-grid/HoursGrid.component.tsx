import React from "react";
import {
    makeStyles,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
    Paper,
} from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import * as HoursConstants from "../hours-constants/hoursConstants.component";
import HoursFooter from "../hours-footer/HoursFooter.component";
import HoursCell from "../hours-cell/HoursCell.component";
import HoursTableHead from "../hours-table-header/HoursTableHeader.component";
import HoursComment from "../hours-comment/HoursComment.component";

import IDay from "../../common/interfaces/IDay";

interface IProps {
    expandColumns: boolean;
    days: IDay[];
    handleChange: any;
    save: any;
    readOnly: any;
}

const columns = HoursConstants.columns;

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        overflowX: "inherit",
    },
}));

const HoursGrid = ({
    expandColumns,
    days,
    handleChange,
    save,
    readOnly,
}: IProps) => {
    const classes = useStyles();
    const getRowClass = (isWeekend: boolean, isPublicHoliday: boolean) => {
        let output = "";
        output += isWeekend ? " isWeekend" : "";
        output += isPublicHoliday ? " isPublicHoliday" : "";
        return output;
    };

    const [explanation, setExplanation] = React.useState("");
    const [showComment, setShowComment] = React.useState(false);
    const [rowIndex, setRowIndex] = React.useState(0);

    const getDayName = (date: string, index: number) => {
        const days = [
            "Zondag",
            "Maandag",
            "Dinsdag",
            "Woensdag",
            "Donderdag",
            "Vrijdag",
            "Zaterdag",
        ];

        if (!date) {
            return days[index];
        }

        const dateObj = new Date(date);
        return days[dateObj.getDay()];
    };

    const openComment = (explanation: string, index: number) => {
        setExplanation(explanation);
        setRowIndex(index);
        setShowComment(true);
    };

    const onCancelComment = () => {
        setShowComment(false);
    };

    const onSaveComment = (text: string) => {
        days[rowIndex].explanation = text;
        setShowComment(false);
        save();
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader size="small" aria-label="simple table">
                <HoursTableHead expandColumns={expandColumns} />
                <TableBody>
                    {days.map((row, index) => {
                        return (
                            <TableRow
                                key={row.day}
                                className={getRowClass(
                                    row.isWeekend,
                                    row.isPublicHoliday,
                                )}
                            >
                                <TableCell component="th" scope="row">
                                    {row.isPublicHoliday ? (
                                        <Tooltip title="Dit is een feestdag">
                                            <span>
                                                {getDayName(row.date, index)}
                                            </span>
                                        </Tooltip>
                                    ) : (
                                        getDayName(row.date, index)
                                    )}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.day}
                                </TableCell>
                                {columns.map((column, i) => {
                                    if (!column.enabled && !expandColumns) {
                                        return null;
                                    }
                                    return (
                                        <HoursCell
                                            key={`${column.id}-${i}`}
                                            row={row}
                                            column={column.id}
                                            handleChange={handleChange}
                                            save={save}
                                            days={days}
                                            readOnly={readOnly}
                                        />
                                    );
                                })}
                                <TableCell>
                                    <Button
                                        onClick={(event) => {
                                            openComment(row.explanation, index);
                                        }}
                                        id={"commentButton-" + index}
                                    >
                                        <ChatBubbleOutlineIcon
                                            color={
                                                row.explanation === ""
                                                    ? "disabled"
                                                    : "primary"
                                            }
                                        />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <HoursFooter expandColumns={expandColumns} days={days} />
            </Table>

            <HoursComment
                input={explanation}
                readOnly={readOnly}
                save={onSaveComment}
                cancel={onCancelComment}
                show={showComment}
            />
        </TableContainer>
    );
};

export default HoursGrid;
