import React from "react";
import {
    makeStyles,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Paper,
} from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import * as HoursConstants from "../hours-constants/hoursConstants.component";
import HoursFooter from "../hours-footer/HoursFooter.component";
import HoursCell from "../hours-cell/HoursCell.component";
import HoursTableHead from "../hours-table-header/HoursTableHeader.component";

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
    const getRowClass = (isWeekend: boolean) => {
        return isWeekend ? "highlight" : "";
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

    const onCloseComment = () => {
        setShowComment(false);
    };

    const onSaveComment = () => {
        days[rowIndex].explanation = explanation;
        onCloseComment();
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
                                className={getRowClass(row.isWeekend)}
                            >
                                <TableCell component="th" scope="row">
                                    {getDayName(row.date, index)}
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

            <Dialog
                open={showComment}
                onClose={onCloseComment}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md"
                id="commentDialog"
            >
                <DialogTitle id="form-dialog-title">Toelichting</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="explanation"
                        value={explanation}
                        onChange={(event) => {
                            setExplanation(event.target.value);
                        }}
                        disabled={readOnly}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseComment}>Annuleer</Button>
                    <Button onClick={onSaveComment} color="primary">
                        Bewaar
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default HoursGrid;
