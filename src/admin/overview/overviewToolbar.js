import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
    IconButton,
    Tooltip,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Toolbar,
} from "@material-ui/core/";

import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

import * as HoursConstants from "../../hours/hoursConstants";

OverviewToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    currentMonth: PropTypes.number.isRequired,
    currentYear: PropTypes.number.isRequired,
    onChangeDate: PropTypes.func.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
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

export default function OverviewToolbar(props) {
    const classes = useStyles();
    const { numSelected, currentMonth, currentYear, onChangeDate } = props;
    const [month, setMonth] = React.useState(currentMonth);
    const [year, setYear] = React.useState(currentYear);

    const onChangeMonth = value => {
        setMonth(value);
        onChangeDate(value, year);
    };

    const onChangeYear = value => {
        setYear(value);
        onChangeDate(month, value);
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

            <FormControl>
                <InputLabel id="select-month-label">Maand</InputLabel>
                <Select
                    labelId="select-month-label"
                    id="select-month-label"
                    value={month}
                    onChange={event => onChangeMonth(event.target.value)}
                >
                    {HoursConstants.months.map(month => {
                        return (
                            <MenuItem value={month.id} key={month.id}>
                                {month.description}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="select-year-label">Jaar</InputLabel>
                <Select
                    labelId="select-year-label"
                    id="select-year-label"
                    value={year}
                    onChange={event => onChangeYear(event.target.value)}
                >
                    {HoursConstants.years.map(year => {
                        return (
                            <MenuItem value={year} key={year}>
                                {year}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}
