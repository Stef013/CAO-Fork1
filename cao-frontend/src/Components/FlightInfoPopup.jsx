import React from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Link,
    Grid,
    MenuItem,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function FLightInfoPopup(props) {
    const [open, setOpen] = React.useState(false);
    const [tickets, setTickets] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [gotTickets, setGotTickets] = React.useState(false);
    const classes = useStyles();


    const getFlightData = async () => {
        await axios
            .get("http://20.82.46.255/booking/booking/flight/" + props.flightId)
            .then((res) => {
                console.log(res.data);
                setTickets(res.data);
                setLoading(true);
                setGotTickets(true);
                handleOpen();
            })
            .catch((err) => {
                console.log(err);
                setLoading(true);
                setGotTickets(false);

                handleOpen();
            });
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={getFlightData}>
                <InfoIcon />
            </Button>
            <Dialog open={open} maxWidth="lg" onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ padding: 10, marginTop: 30, marginLeft: 20 }} id="form-dialog-title">Passengers:</DialogTitle>
                {loading ? (

                    gotTickets ? (
                        <DialogContent style={{ padding: 10, marginLeft: 20, marginBottom: 30 }}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Firstname</b></TableCell>
                                            <TableCell><b>Lastname</b></TableCell>
                                            <TableCell><b>Gender</b></TableCell>
                                            <TableCell><b>Date of Birth</b></TableCell>
                                            <TableCell><b>Seat</b></TableCell>
                                            <TableCell><b>Luggage</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tickets.map((ticket) => (
                                            <TableRow key={ticket.id}>
                                                <TableCell>{ticket.firstname}</TableCell>
                                                <TableCell>{ticket.lastname}</TableCell>
                                                <TableCell>{ticket.gender}</TableCell>
                                                <TableCell>{ticket.dateOfBirth}</TableCell>
                                                <TableCell>{ticket.seat}</TableCell>
                                                <TableCell>{ticket.extraLuggage}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContent>
                    )
                        :
                        (
                            <DialogContent style={{ padding: 10, marginLeft: 20, marginBottom: 30, marginRight: 20 }}>
                                <Typography >No Passengers on this flight</Typography>
                            </DialogContent>
                        )

                ) :
                    (
                        <Typography >Loading</Typography>
                    )}
            </Dialog>
        </div >
    );
}
