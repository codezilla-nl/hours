import React from "react";
import {
    Toolbar,
    FormControl,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import ValidationNotification from "./validation/ValidationNotification";
import * as HoursConstants from "./hoursConstants";

const useStyles = makeStyles((theme) => ({
    alert: {
        color: "red",
    },
    spacingLeft: {
        marginLeft: theme.spacing(2),
    },
    spacingRight: {
        marginRight: theme.spacing(2),
    },
    right: {
        marginLeft: "auto",
        display: "inline-flex",
        justifyContent: "flex-end",
        alignItems: "center",
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
    getReport,
    validationMessages,
    saved,
    approved,
}) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onExpandColumns = () => {
        expandColumns = !expandColumns;
        handleInputChange("expandColumns", expandColumns);
    };

    if (isTemplate)
        return (
            <ClientAndProject
                classes={classes}
                client={client}
                project={project}
                readOnly={approved}
                handleInputChange={handleInputChange}
            />
        );
    return (
        <Toolbar disableGutters>
            <FormControl className={classes.spacingLeft}>
                <InputLabel id="select-month-label">Maand</InputLabel>
                <Select
                    labelId="select-month-label"
                    id="select-month-label"
                    defaultValue={currentMonth}
                    onChange={(event) =>
                        handleInputChange("month", event.target.value)
                    }
                >
                    {months.map((month) => {
                        return (
                            <MenuItem value={month.id} key={month.id}>
                                {month.description}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl className={classes.spacingLeft}>
                <InputLabel id="select-year-label">Jaar</InputLabel>
                <Select
                    labelId="select-year-label"
                    id="select-year-label"
                    defaultValue={currentYear}
                    onChange={(event) =>
                        handleInputChange("year", event.target.value)
                    }
                >
                    {years.map((year) => {
                        return (
                            <MenuItem value={year} key={year}>
                                {year}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <ClientAndProject
                classes={classes}
                client={client}
                project={project}
                approved={approved}
                handleInputChange={handleInputChange}
            />

            {validationMessages?.length > 0 ? (
                <ValidationNotification
                    className={classes.spacingLeft}
                    messages={validationMessages}
                />
            ) : null}
            <div className={classes.right}>
                {saved ? (
                    <Typography
                        variant="overline"
                        display="block"
                        className={classes.spacingLeft}
                    >
                        Opgeslagen
                    </Typography>
                ) : null}
                {approved ? (
                    <>
                        <DoneIcon
                            color="primary"
                            className={classes.spacingRight}
                        />
                        <Typography className={classes.spacingRight}>
                            Akkoord
                        </Typography>
                    </>
                ) : null}

                <div>
                    <IconButton
                        aria-label="more"
                        aria-controls="header-menu"
                        aria-haspopup="true"
                        id="headerMenuButton"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="headerMenu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={() => {
                                applyTemplate();
                                handleClose();
                            }}
                            disabled={Boolean(approved)}
                            id="applyTemplate"
                        >
                            Pas template toe
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                onExpandColumns();
                                handleClose();
                            }}
                            id="expandColumns"
                        >
                            Toon alle velden
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                getReport();
                                handleClose();
                            }}
                            id="getReport"
                        >
                            Maak PDF
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </Toolbar>
    );
};

export default HoursHeader;

const ClientAndProject = ({
    classes,
    client,
    project,
    handleInputChange,
    approved,
}) => (
    <>
        <TextField
            className={classes.spacingLeft}
            id="client"
            label="Klant"
            value={client}
            disabled={Boolean(approved)}
            onChange={(event) =>
                handleInputChange("client", event.target.value)
            }
        />
        <TextField
            className={classes.spacingLeft}
            id="project"
            label="Project"
            value={project}
            disabled={Boolean(approved)}
            onChange={(event) =>
                handleInputChange("project", event.target.value)
            }
        />
    </>
);
