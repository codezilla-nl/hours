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
} from "@material-ui/core";

import * as HoursConstants from "./hoursConstants";

const months = HoursConstants.months;
const years = HoursConstants.years;
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const HoursHeader = ({
    isTemplate,
    client,
    project,
    expandColumns,
    isFinal,
    handleInputChange,
}) => {
    if (isTemplate) return null;
    return (
        <Toolbar>
            <Grid container direction="row" alignItems="flex-start">
                <FormControl>
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
                <FormControl>
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
                    id="client"
                    label="Klant"
                    value={client}
                    onChange={event =>
                        handleInputChange("client", event.target.value)
                    }
                />
                <TextField
                    id="project"
                    label="Project"
                    value={project}
                    onChange={event =>
                        handleInputChange("project", event.target.value)
                    }
                />

                <FormControlLabel
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
                <FormControlLabel
                    control={
                        <Switch
                            checked={isFinal}
                            onChange={event =>
                                handleInputChange(
                                    "isFinal",
                                    event.target.checked,
                                )
                            }
                            color="primary"
                        />
                    }
                    label="Definitief"
                />
            </Grid>
        </Toolbar>
    );
};

export default HoursHeader;
