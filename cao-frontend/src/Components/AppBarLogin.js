import React, { useState } from "react";
import { AppBar, ClickAwayListener, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography, Button } from '@material-ui/core';
import AccountCircle from "@material-ui/icons/AccountCircle";
import logo from "../Images/logo.png";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        background: "white",
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        height: "36px",
        padding: "20px",
        display: "block",
        boxSizing: "content-box",
    },
}));

export default function AppBarLogin() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const isProfileMenuOpen = Boolean(anchorEl);

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <img src={logo} alt="Logo" className={classes.logo}></img>
                    </Typography>
                    <LanguageSelector />
                </Toolbar>
            </AppBar>
        </div>
    );
}
