import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Checkbox,
    Paper,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
} from "@material-ui/core/";

import Hours from "../firebase/data/Hours";

import * as Constants from "./overview/constants";

import OverviewHeader from "./overview/overviewHeader";
import OverviewToolbar from "./overview/overviewToolbar";

let rows = [];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getTotalHoursPerCategory(days, category) {
    let total = 0;
    days.forEach(day => {
        total += Number(day[category]);
    });
    return total;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
}));

export default function OverviewTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const handleChangeDate = (month, year) => {
        getData(month, year);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map(row => row.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = id => selected.indexOf(id) !== -1;

    const getData = async (month, year) => {
        setIsLoading(true);
        const list = await Hours.getHours(month, year);
        rows = list.map(row => {
            initRow(row);
            return row;
        });
        setIsLoading(false);
    };

    const initRow = row => {
        Constants.columns.forEach(cell => {
            if (cell.numeric) {
                row[cell.id] = getTotalHoursPerCategory(row.days, cell.id);
            }
        });
    };

    const getTotal = column => {
        if (!column.numeric) {
            return "";
        }

        const values = rows.map(x => x[column.id]);
        return values.reduce((total, currentValue) => {
            return Number(total) + Number(currentValue);
        });
    };

    React.useEffect(() => {
        getData(currentMonth, currentYear);
    }, [currentMonth, currentYear]);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <OverviewToolbar
                    numSelected={selected.length}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    onChangeDate={handleChangeDate}
                />

                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="small"
                        aria-label="enhanced table"
                    >
                        <OverviewHeader
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        {isLoading || rows.length === 0 ? null : (
                            <>
                                <TableBody>
                                    {stableSort(
                                        rows,
                                        getComparator(order, orderBy),
                                    ).map((row, index) => {
                                        const isItemSelected = isSelected(
                                            row.id,
                                        );
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={event =>
                                                    handleClick(event, row.id)
                                                }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            "aria-labelledby": labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                >
                                                    {row.profile.displayName}
                                                </TableCell>
                                                <TableCell>
                                                    {row.client}
                                                </TableCell>
                                                <TableCell>
                                                    {row.project}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                >
                                                    {row.worked}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                >
                                                    {row.overtime}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                >
                                                    {row.sick}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                >
                                                    {row.holiday}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                >
                                                    {row.publicHoliday}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                >
                                                    {row.available}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                >
                                                    {row.education}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                >
                                                    {row.other}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                >
                                                    {row.standBy}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.kilometers}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell padding="checkbox"></TableCell>

                                        {Constants.columns.map(column => {
                                            return (
                                                <TableCell
                                                    align="right"
                                                    key={"footer-" + column.id}
                                                    padding={
                                                        column.disablePadding
                                                            ? "none"
                                                            : "default"
                                                    }
                                                >
                                                    {getTotal(column)}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableFooter>
                            </>
                        )}
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}
