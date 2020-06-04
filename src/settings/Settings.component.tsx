import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core/";

import HoursContainer from "../hours/hours-container/HoursContainer.component";
import Profile from "../firebase/data/Profile";

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
    const [hoursPerWeek, setHoursPerWeek] = React.useState(
        profile.hoursPerWeek || "40",
    );

    React.useEffect(() => {
        setHoursPerWeek(profile.hoursPerWeek);
    }, [profile.hoursPerWeek]);

    const save = (): void => {
        Profile.updateProfile({ ...profile, hoursPerWeek: hoursPerWeek });
    };

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
                    id="hoursPerWeek"
                    label="Aantal uren (bijv. 40)"
                    value={hoursPerWeek}
                    onChange={(event) => {
                        setHoursPerWeek(event.target.value);
                    }}
                    onBlur={save}
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
