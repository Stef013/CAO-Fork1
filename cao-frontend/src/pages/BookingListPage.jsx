import "../App.css";
import React, { Component } from "react";
import BookingList from '../Components/BookingList';
import { Container, withStyles } from "@material-ui/core";

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
            <Container component="main" maxWidth="lg">
                <div className={classes.listStyle}>
                    <BookingList axios={this.props.axios}/>
                </div>
            </Container>
        );

    }
}

export default withStyles(useStyles)(BookingListPage);