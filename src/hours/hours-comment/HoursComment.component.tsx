import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IProps {
    readonly: boolean;
    explanation: string;
    show: boolean;
    onSave: any;
    index: number;
}

export default function HoursComment({
    readonly,
    explanation,
    show,
    onSave,
    index,
}: IProps) {
    const [open, setOpen] = React.useState(show);
    const [comment, setComment] = React.useState(explanation);

    React.useEffect(() => {
        setOpen(show);
        setComment(explanation);
    }, [readonly, explanation, show]);

    const handleClose = () => {
        onSave(comment, index);
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle id="form-dialog-title">Toelichting</DialogTitle>
            <DialogContent>
                <DialogContentText>Geef hier je toelichting</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="explanation"
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Annuleer
                </Button>
                <Button onClick={handleClose} color="primary">
                    Bewaar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
