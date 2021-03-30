import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid, Input, MenuItem, Slider } from '@material-ui/core';
import PassengerInfo from '../Components/PassengerInfo'

const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();

    const [value, setValue] = React.useState(1);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        createDataFieldsForEachPerson(Number(newValue));
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 1) {
            setValue(1);
        } else if (value > 25) {
            setValue(25);
        }
    };

    const createDataFieldsForEachPerson = () => {
        var rows = [];
        for (var i = 0; i < value; i++) {
            // note: we are adding a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(<PassengerInfo id={value} />)
        }
        return <div>{rows}</div>;
    };



    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h3">
                            Passengers information
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component="h3">
                            Number of passengers:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Slider
                            value={typeof value === 'number' ? value : 0}
                            onChange={handleSliderChange}
                            min={1}
                            max={25}
                            step={1}
                            marks
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Input
                            className={classes.input}
                            value={value}
                            margin="dense"
                            autofocus
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 1,
                                min: 1,
                                max: 25,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>

                {createDataFieldsForEachPerson()}

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            <ArrowBackIcon />
                        Flight menu
                    </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                        >
                            Luggage
                        <ArrowForwardIcon />
                        </Button>
                    </Grid>
                </Grid>


                Gender,
                    First Name,
                    last name,
                    date of birth,
                    email Address,
                    mobile phone number
            </div>
        </Container>
    );
}