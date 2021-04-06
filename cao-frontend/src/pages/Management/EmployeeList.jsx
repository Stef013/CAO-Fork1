import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Accordion, AccordionDetails, AccordionSummary, AccordionActions, Typography, Button, Divider, Container, Paper, TextField, MenuItem } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MenuAppBar from "../../Components/MenuAppBar";

const useStyles = (theme) => ({
    maincolumn1: {
        flexBasis: '33%'
    },
    maincolumn2: {
        flexBasis: '33%'
    },
    maincolumn3: {
        flexBasis: '33%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 600,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
        marginRight: 30,
    },
    column1: {
        flexBasis: '30%',
        textAlign: "right",
        marginRight: 50,
    },
    column2: {
        flexBasis: '60%',
    },
    title: {
        marginTop: 30,
        color: "white"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 50,
        paddingLeft: 40,
        paddingRight: 40,
        maxWidth: 800,
    },
    accordion: {
        width: "90%",
    }
});

const roles = [
    {
        value: 'EMPLOYEE',
        label: 'Employee',
    },
    {
        value: 'ADMIN',
        label: 'Admin',
    },
];

class EmployeeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            role: "",
        };

        this.account = {
            id: 0,
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            role: "",
        };
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <MenuAppBar></MenuAppBar>
                <Typography className={classes.title} align="center" variant="h3" >
                    Edit Employees
                </Typography>
                <Container align="center">
                    <Paper className={classes.paper} >
                        <Accordion className={classes.accordion} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <div className={classes.maincolumn1}>
                                    <Typography >1. Piet Janssen</Typography>
                                </div>
                                <div className={classes.maincolumn1}>
                                    <Typography >Piet@janssen.nl</Typography>
                                </div>
                                <div className={classes.maincolumn1}>
                                    <Typography >Employee</Typography>
                                </div>
                            </AccordionSummary>
                            <Divider style={{ marginBottom: 20 }} />
                            <AccordionDetails className={classes.details}>
                                <div className={classes.column1}>
                                    <Typography className={classes.heading}>Reset Password: </Typography>
                                </div>
                                <div className={classes.column2}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                    />
                                </div>
                            </AccordionDetails>
                            <AccordionDetails className={classes.details}>
                                <div className={classes.column1}>
                                    <Typography className={classes.heading}>Change Role:</Typography>
                                </div>
                                <div className={classes.column2}>
                                    <TextField
                                        id="roleselect"
                                        select
                                        fullWidth
                                        required
                                        label="Select role"
                                        name="role"
                                        align="left"
                                        variant="outlined"
                                    >
                                        {roles.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                            </AccordionDetails>
                            <Divider />
                            <AccordionActions>
                                <Button size="small">Cancel</Button>
                                <Button size="small" color="primary" variant="contained">
                                    Save
                            </Button>
                            </AccordionActions>
                        </Accordion>
                    </Paper>
                </Container>
            </div >
        )
    }
}

export default (withStyles(useStyles)(EmployeeList))