import React, { Component } from "react";
import MenuAppBar from "../components/MenuAppBar";
import { Typography, Card, CardContent, Button, Grid } from '@material-ui/core';

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

class Portal extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
        this.navigateCreation = this.navigateCreation.bind(this);
    }

    // componentDidMount() {
    //     document.body.style.backgroundColor = "#3166b0"
    // }
    navigateCreation() {
        this.props.history.push('/policereport');
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ height: "100%" }}>
                <MenuAppBar></MenuAppBar>
                <Typography className={classes.title} align="center" variant="h3" >
                    Police Portal
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
                        <Card className={classes.card} align="center">
                            <CardContent>
                                <Typography className={classes.cardTitle} variant="h6" gutterBottom>
                                    New Police Report
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.createButton}
                                    onClick={this.navigateCreation}>Create</Button>
                            </CardContent>
                        </Card>
                    </Grid>


                </Grid>
            </div>
        )
    }
}



export default (withRouter(withStyles(useStyles)(Portal)))