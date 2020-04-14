import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import HoursGrid from "../../hours/HoursGrid";

import Hours from "../../firebase/data/Hours";

const useStyles = makeStyles((theme) => ({
    alert: {
        color: "red",
    },
    label: {
        fontWeight: "bold",
        marginRight: theme.spacing(2),
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

export default function AdminDetail() {
    const { id } = useParams();
    const [data, setData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    const classes = useStyles();

    const fetchMonth = async (instanceId) => {
        const instance = await Hours.getHoursWithId(instanceId);
        setData(instance.data());
        setIsLoading(false);
    };

    React.useEffect(() => {
        fetchMonth(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return isLoading ? (
        <></>
    ) : (
        <>
            <Toolbar>
                <Button
                    color="primary"
                    component={NavLink}
                    className={classes.spacingRight}
                    startIcon={<ChevronLeftIcon />}
                    to="/admin"
                >
                    Terug
                </Button>
                <Typography className={classes.label}>Naam:</Typography>
                <Typography className={classes.spacingRight}>
                    {data.profile.displayName}
                </Typography>
                <Typography className={classes.label}>Klant:</Typography>
                <Typography className={classes.spacingRight}>
                    {data.client}
                </Typography>
                <Typography className={classes.label}>Project:</Typography>
                <Typography className={classes.spacingRight}>
                    {data.project}
                </Typography>
            </Toolbar>
            <HoursGrid
                expandColumns="false"
                days={data.days}
                readOnly="true"
            ></HoursGrid>
        </>
    );
}
