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
    textSpacing: {
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
                <Typography variant="h4" className={classes.textSpacing}>
                    Instellingen
                </Typography>
                <Typography variant="body2">
                    Hoeveel uren werk jij in de week?
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="hoursPerWeek"
                    label="Aantal uren (bijv. 40)"
                    type="number"
                />

                <Typography variant="body2" className={classes.textSpacing}>
                    Hieronder zie een je een template van een werkweek. Vul deze
                    in en je kan hem voor elke maand als basis gebruiken.
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
