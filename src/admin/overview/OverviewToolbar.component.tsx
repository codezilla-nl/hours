import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Toolbar,
} from "@material-ui/core/";

import DoneIcon from "@material-ui/icons/Done";

import * as HoursConstants from "../../hours/hours-constants/hoursConstants.component";

OverviewToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    currentMonth: PropTypes.number.isRequired,
    currentYear: PropTypes.number.isRequired,
    onChangeDate: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        paddingRight: theme.spacing(1),
    },
    formControl: {
        marginLeft: theme.spacing(2),
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: "1",
    },
}));

interface IProps {
    numSelected: number;
    currentMonth: number;
    currentYear: number;
    onChangeDate: any;
    approve: any;
}

export default function OverviewToolbar({
    numSelected,
    currentMonth,
    currentYear,
    onChangeDate,
    approve,
}: IProps) {
    const classes = useStyles();
    const [month, setMonth] = React.useState(currentMonth);
    const [year, setYear] = React.useState(currentYear);

    const onChangeMonth = (value: number) => {
        setMonth(value);
        onChangeDate(value, year);
    };

    const onChangeYear = (value: number) => {
        setYear(value);
        onChangeDate(month, value);
    };

    const onApprove = () => {
        approve();
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                >
                    {numSelected} geselecteerd
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                >
                    Beheer
                </Typography>
            )}

            {numSelected > 0 ? (
                <Button
                    variant="outlined"
                    startIcon={<DoneIcon />}
                    onClick={onApprove}
                >
                    Akkoord
                </Button>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-month-label">Maand</InputLabel>
                        <Select
                            labelId="select-month-label"
                            id="select-month-label"
                            value={month}
                            onChange={(event) =>
                                onChangeMonth(Number(event.target.value))
                            }
                        >
                            {HoursConstants.months.map((month) => {
                                return (
                                    <MenuItem value={month.id} key={month.id}>
                                        {month.description}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-year-label">Jaar</InputLabel>
                        <Select
                            labelId="select-year-label"
                            id="select-year-label"
                            value={year}
                            onChange={(event) =>
                                onChangeYear(Number(event.target.value))
                            }
                        >
                            {HoursConstants.years.map((year) => {
                                return (
                                    <MenuItem value={year} key={year}>
                                        {year}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </>
            )}
        </Toolbar>
    );
}
