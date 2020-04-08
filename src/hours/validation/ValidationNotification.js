import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, IconButton, Popover, Typography } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(1),
    },
}));

export default function ValidationNotification({ messages }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <IconButton aria-label="Validation messages" onClick={handleClick}>
                <Badge badgeContent={messages.length} color="error">
                    <WarningIcon />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                {messages.map((message, index) => {
                    return (
                        <Typography className={classes.typography} key={index}>
                            {message}
                        </Typography>
                    );
                })}
            </Popover>
        </>
    );
}
