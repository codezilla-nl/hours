import React from "react";
import {
    Badge,
    IconButton,
    Popover,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

export default function ValidationNotification({ messages }) {
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
                <List>
                    {messages.map((message, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemText primary={message} />
                            </ListItem>
                        );
                    })}
                </List>
            </Popover>
        </>
    );
}
