import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import TopButton from '../Components/TopButton';
import CustomerLogin from './CustomerLogin';
import EmployeeLogin from './Management/EmployeeLogin';
import { useTranslation } from 'react-i18next';

export default function Login(props) {
    const [showEmployeeLogin, setShowEmployeeLogin] = useState(false);
    const { t } = useTranslation();

    const switchLogin = () => {
        setShowEmployeeLogin(!showEmployeeLogin);
    }

    return (
        <Container component="main" maxWidth="sm">
            <TopButton text={showEmployeeLogin ? t('loginpage.Customer login') : t('loginpage.Employee login')} onClick={() => switchLogin()}></TopButton>
            {showEmployeeLogin ? (
                <EmployeeLogin setToken={props.setToken} setAccountType={props.setAccountType} axios={props.axios} />
            ) : (
                <CustomerLogin setToken={props.setToken} setAccountType={props.setAccountType} axios={props.axios} />
            )}
        </Container>
    )
}