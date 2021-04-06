import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BookingPassengers from '../Components/BookingPassengers'
import BookingSeatpicker from '../Components/BookingSeatpicker'
import BookingOverview from '../Components/BookingOverview'
import Error from './Error'
import { Route, Switch } from 'react-router';
import { Button, TextField } from '@material-ui/core';

class Booking extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPage: 1,
        }
    }

    nextPage = () => {
        // this.setState(prevState => {
        //     return { currentPage: prevState.count + 1 }
        // })
        this.setState({currentPage: this.state.currentPage + 1})
    }
    
    previousPage = () => {
        this.setState({currentPage: this.state.currentPage - 1})
    }

    render() {
        switch (this.state.currentPage) {
            case 1:
                return (<BookingPassengers nextPage={this.nextPage} previousPage={this.previousPage} />);
            case 2:
                return (<BookingSeatpicker nextPage={this.nextPage} previousPage={this.previousPage} />);
            case 3:
                return (<BookingOverview nextPage={this.nextPage} previousPage={this.previousPage} />);
            default:
                return (<Error />);
        }
    }
}

export default Booking