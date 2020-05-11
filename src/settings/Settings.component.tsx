import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core/";

import HoursContainer from "../hours/hours-container/HoursContainer.component";

import IProfile from "../common/interfaces/IProfile";

const useStyles = makeStyles((theme) => ({
    spacing: {
        margin: theme.spacing(1, 1),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
    },
    text: {
        margin: theme.spacing(1, 0),
    },
}));

interface IProps {
    profile: IProfile;
    notification: any;
}

export default function Settings({ profile, notification }: IProps) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.spacing}>
                <Typography variant="h4">Instellingen</Typography>
                <Typography variant="body1">Hoeveel uren werk jij?</Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="hoursPerWeek"
                    label="Aantal uren per week"
                    type="number"
                />
                <Typography variant="h5">Template</Typography>
                <Typography variant="body1" className={classes.text}>
                    Maak hier een template voor je gemiddelde werkweek. Pas het
                    template toe op de hele urenstaat met een klik op de knop.
                </Typography>

                <Typography variant="body2" className={classes.text}>
                    Uren die je al hebt ingevuld worden niet overschreven.
                </Typography>
            </div>
            <HoursContainer
                type="template"
                profile={profile}
                notification={notification}
            />
        </>
    );
}
