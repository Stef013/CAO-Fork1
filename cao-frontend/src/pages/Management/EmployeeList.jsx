import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, AccordionActions, Typography, Button, Divider, Container, Paper, TextField, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuAppBar from "../../Components/MenuAppBar";
import axios from 'axios';

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
        width: "100%",
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
            gotUsers: false,
            expanded: false,
        };

        this.account = {
            id: 0,
            password: "",
            role: "",
        };

        this.accounts = [];
    }

    async componentDidMount() {
        console.log("begin");
        await axios.get('http://localhost:8080/account/employee',
        ).then(res => {
            console.log(res);
            console.log(res.data);
            this.accounts = res.data;
            this.setState({ gotUsers: true });
        }).catch(error => console.log(error));
        console.log("end");
    }

    handleExpand = (panel) => (event, isExpanded) => {
        const exp = isExpanded ? panel : false;
        this.setState({ expanded: exp });
        this.account = {
            id: 0,
            password: "",
            role: "",
        }
    };

    async handleSubmit(id, event) {
        event.preventDefault();

        this.account.id = id;

        console.log(this.account);
        await axios.put('http://localhost:8080/account/employee', this.account, {
            headers: {
                "Content-Type": 'application/json', 'Accept': 'application/json'
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            document.getElementById("form" + id).reset();

        }).catch(error => console.log(error));
    }

    render() {
        const { classes } = this.props;
        const { gotUsers, expanded } = this.state;

        return (
            <div>
                <MenuAppBar></MenuAppBar>
                <Typography className={classes.title} align="center" variant="h3" >
                    Edit Employees
                </Typography>
                {gotUsers ?
                    (
                        <Container align="center">
                            <Paper className={classes.paper} >

                                {this.accounts.map((user) => (

                                    <Accordion className={classes.accordion} expanded={expanded === user.email} onChange={this.handleExpand(user.email)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1c-content"
                                            id="panel1c-header"
                                        >
                                            <div className={classes.maincolumn1}>
                                                <Typography>{user.firstname} {user.lastname}</Typography>
                                            </div>
                                            <div className={classes.maincolumn1}>
                                                <Typography >{user.email}</Typography>
                                            </div>
                                            <div className={classes.maincolumn1}>
                                                <Typography >{user.role}</Typography>
                                            </div>
                                        </AccordionSummary>
                                        <Divider style={{ marginBottom: 20 }} />
                                        <form id={"form" + user.id} onSubmit={(event) => this.handleSubmit(user.id, event)} >
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
                                                        onInput={e => this.account.password = e.target.value}
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
                                                        label="Select role"
                                                        name="role"
                                                        align="left"
                                                        variant="outlined"
                                                        onChange={e => this.account.role = e.target.value}
                                                    >
                                                        {roles.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </div>
                                            </AccordionDetails>
                                            <Divider style={{ marginBottom: 10, marginTop: 15 }} />
                                            <AccordionActions>
                                                <Button size="small">Cancel</Button>
                                                <Button type="submit" size="small" color="primary" variant="contained" >
                                                    Save
                                                </Button>
                                            </AccordionActions>
                                        </form>
                                    </Accordion>
                                ))}

                            </Paper>
                        </Container>
                    )
                    :
                    (
                        <Typography className={classes.title} align="center" variant="h4" >
                            Loading...
                        </Typography>
                    )
                }

            </div >
        )
    }
}

export default (withStyles(useStyles)(EmployeeList))