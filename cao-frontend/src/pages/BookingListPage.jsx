import "../App.css";
import React, { Component } from "react";
import MenuAppBar from "../Components/MenuAppBar";
import BookingList from '../Components/BookingList';
import { Container, withStyles } from "@material-ui/core";
import BookingOverview from "../Components/BookingOverview";

const useStyles = (theme) => ({
    listStyle: {
        margin: "10px",
    },
});

class BookingListPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div>
            <MenuAppBar></MenuAppBar>
            <Container component="main" maxWidth="lg">
                <div className={classes.listStyle}>
                    <BookingList></BookingList>
                </div>
            </Container>
            </div>
        );

    }
}

export default withStyles(useStyles)(BookingListPage);