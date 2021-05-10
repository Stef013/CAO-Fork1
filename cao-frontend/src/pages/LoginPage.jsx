import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import TopButton from '../Components/TopButton';
import CustomerLogin from './CustomerLogin';
import EmployeeLogin from './Management/EmployeeLogin';

export default function Login(props) {
    const [showEmployeeLogin, setShowEmployeeLogin] = useState(false);

    const switchLogin = () => {
        setShowEmployeeLogin(!showEmployeeLogin);
    }

    return (
        <Container component="main" maxWidth="sm">
            <span>{showEmployeeLogin}</span>
            <TopButton text={showEmployeeLogin ? 'Customer login' : 'Employee login'} onClick={() => switchLogin()}></TopButton>
            {showEmployeeLogin ? (
                <EmployeeLogin setToken={props.setToken} />
            ) : (
                <CustomerLogin setToken={props.setToken} />
            )}
        </Container>
    )
}