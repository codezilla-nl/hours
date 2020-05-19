import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@material-ui/core";

interface IProps {
    input: string;
    save: any;
    cancel: any;
    readOnly: boolean;
    show: boolean;
}

const HoursComment = ({ input, save, cancel, readOnly, show }: IProps) => {
    const [comment, setComment] = React.useState(input);

    const onCancel = () => {
        cancel();
    };

    const onSave = () => {
        save(comment);
    };

    React.useEffect(() => {
        setComment(input);
    }, [input, show]);

    return (
        <Dialog
            open={show}
            onClose={onCancel}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            maxWidth="md"
            id="commentDialog"
        >
            <DialogTitle id="form-dialog-title">Toelichting</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="comment"
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                    disabled={readOnly}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Annuleer</Button>
                <Button onClick={onSave} color="primary">
                    Bewaar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default HoursComment;
