import React, { Component } from "react";
import MenuAppBar from "../../Components/MenuAppBar";
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";

const useStyles = (theme) => ({

    title: {
        marginTop: 30,
        color: "white"
    },
    card: {
        width: 275,
        height: 260,
        margin: 10,
        align: "center",
    },
    cardTitle: {
        marginTop: 30,
        color: "#575757"
    },
    createButton: {
        top: 60,
        width: 140,

    }
});

class EmployeePortal extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
        this.navigateHome = this.navigateHome.bind(this);
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#3166b0"
    }
    navigateHome() {
        this.props.history.push('/EmployeeCreation');
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ height: "100%" }}>
                <MenuAppBar></MenuAppBar>
                <Typography className={classes.title} align="center" variant="h3" >
                    Management Portal
                </Typography>
                <Card className={classes.card} align="center">
                    <CardContent>

                        <Typography className={classes.cardTitle} variant="h6" gutterBottom>
                            New Employee Account
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.createButton}
                            onClick={this.navigateHome}>Create</Button>
                    </CardContent>

                </Card>

            </div>
        )
    }
}



export default (withRouter(withStyles(useStyles)(EmployeePortal)))