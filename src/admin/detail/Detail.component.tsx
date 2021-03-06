import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DoneIcon from "@material-ui/icons/Done";
import UndoIcon from "@material-ui/icons/Undo";

import HoursGrid from "../../hours/hours-grid/HoursGrid.component";
import Utils from "../../common/Utils";
import Hours from "../../firebase/data/Hours";

import IHours from "../../common/interfaces/IHours";

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

export default function AdminDetail({ notification }: { notification: any }) {
    const { id } = useParams();
    const [data, setData] = React.useState<IHours>({
        profile: {
            id: "",
            isAdmin: false,
            microsoftId: "",
            displayName: "",
            email: "",
        },
        id: "",
        days: [],
        approved: false,
    });
    const [isLoading, setIsLoading] = React.useState(true);

    const classes = useStyles();

    const fetchMonth = async (documentId: string) => {
        setIsLoading(true);
        Hours.getHoursWithId(documentId)
            .then((response) => {
                const data = response.data();
                if (data) {
                    setData({
                        days: Utils.initDays(
                            data.days,
                            false,
                            data.year,
                            data.month,
                        ),
                        id: data.id,
                        profile: data.profile,
                        approved: data.approved,
                    });
                }
            })
            .catch((error) => {
                notification("Niet gelukt om uren op te halen: " + error);
            });
        setIsLoading(false);
    };

    const saveMonth = async (documentId: string, document: IHours) => {
        setIsLoading(true);

        Hours.updateHours(documentId, document)
            .then(() => {
                setIsLoading(false);
                notification("Opgeslagen");
            })
            .catch((error) => {
                notification("Niet gelukt om te bewaren: " + error);
            });
    };

    const onApprove = () => {
        const approved = !Boolean(data?.approved);
        setData({ ...data, approved: approved });

        const document = data;
        document.approved = approved;

        if (id) {
            saveMonth(id, document);
        }
    };

    React.useEffect(() => {
        if (id) {
            fetchMonth(id);
        }
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
                <div className={classes.right}>
                    {data.approved ? (
                        <>
                            <DoneIcon
                                color="primary"
                                className={classes.spacingRight}
                            />
                            <Typography className={classes.spacingRight}>
                                Akkoord
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<UndoIcon />}
                                onClick={onApprove}
                            >
                                Herstel
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<DoneIcon />}
                            onClick={onApprove}
                        >
                            Akkoord
                        </Button>
                    )}
                </div>
            </Toolbar>
            <HoursGrid
                expandColumns={true}
                days={data.days}
                readOnly="true"
                handleChange=""
                save=""
            ></HoursGrid>
        </>
    );
}
