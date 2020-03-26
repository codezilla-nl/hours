import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import * as HoursConstants from "./hoursConstants";

const months = HoursConstants.months;
const years = HoursConstants.years;
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const HoursHeader = props => {
    // handleInputChange = e => {
    //     const { name, value, checked } = e.target;
    //     checked
    //         ? this.setState({ [name]: checked })
    //         : this.setState({ [name]: value });
    // };

    const {
        isTemplate,
        setMonth,
        client,
        handleClientInput,
        project,
        handleProjectInput,
        columnsExpanded,
        expandColumns,
        isFinal,
        makeFinal,
    } = props;

    if (!isTemplate) return null;
    return (
        <Toolbar>
            <Grid container direction="row" alignItems="flex-start">
                <FormControl>
                    <InputLabel id="select-month-label">Maand</InputLabel>
                    <Select
                        labelId="select-month-label"
                        id="select-month-label"
                        value={currentMonth}
                        onChange={event =>
                            setMonth(event.target.value, currentYear)
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
                        value={currentYear}
                        onChange={event =>
                            setMonth(currentMonth, event.target.value)
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
                    onChange={event => handleClientInput(event.target.value)}
                />
                <TextField
                    id="project"
                    label="Project"
                    value={project}
                    onChange={event => handleProjectInput(event.target.value)}
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={columnsExpanded}
                            onChange={event =>
                                expandColumns(event.target.checked)
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
                                makeFinal(event.target.checked, isTemplate)
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
