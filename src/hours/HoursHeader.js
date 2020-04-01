import React from "react";
import {
    Toolbar,
    Grid,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as HoursConstants from "./hoursConstants";

const useStyles = makeStyles(theme => ({
    formControl: {
        marginRight: theme.spacing(1),
    },
}));

const months = HoursConstants.months;
const years = HoursConstants.years;
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const HoursHeader = ({
    isTemplate,
    client,
    project,
    expandColumns,
    handleInputChange,
    applyTemplate,
}) => {
    const classes = useStyles();

    if (isTemplate) return null;
    return (
        <Toolbar>
            <FormControl className={classes.formControl}>
                <InputLabel id="select-month-label">Maand</InputLabel>
                <Select
                    labelId="select-month-label"
                    id="select-month-label"
                    defaultValue={currentMonth}
                    onChange={event =>
                        handleInputChange("month", event.target.value)
                    }
                >
                    {months.map(month => {
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
                    defaultValue={currentYear}
                    onChange={event =>
                        handleInputChange("year", event.target.value)
                    }
                >
                    {years.map(year => {
                        return (
                            <MenuItem value={year} key={year}>
                                {year}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <TextField
                className={classes.formControl}
                id="client"
                label="Klant"
                value={client}
                onChange={event =>
                    handleInputChange("client", event.target.value)
                }
            />
            <TextField
                className={classes.formControl}
                id="project"
                label="Project"
                value={project}
                onChange={event =>
                    handleInputChange("project", event.target.value)
                }
            />

            <FormControlLabel
                className={classes.formControl}
                control={
                    <Switch
                        checked={expandColumns}
                        onChange={event =>
                            handleInputChange(
                                "expandColumns",
                                event.target.checked,
                            )
                        }
                        color="primary"
                    />
                }
                label="Toon alle velden"
            />
            <Button
                className={classes.formControl}
                variant="contained"
                onClick={applyTemplate}
            >
                {"Gebruik Template"}
            </Button>
        </Toolbar>
    );
};

export default HoursHeader;
