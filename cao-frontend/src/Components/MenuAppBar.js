import React, { useState } from "react";
import { AppBar, ClickAwayListener, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography, Button } from '@material-ui/core';
import AccountCircle from "@material-ui/icons/AccountCircle";
import logo from "../Images/logo.png";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

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

export default function MenuAppBar(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [auth] = React.useState(true);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(anchorEl);

  const handleClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleLogout = (event) => {
    handleClose(event);
    props.setToken(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src={logo} alt="Logo" className={classes.logo}></img>
          </Typography>
          <Button style={{ marginRight: 20 }} color="primary" onClick={() => history.push('/BookingList')}>My Bookings</Button>
          <Button style={{ marginRight: 20 }} color="primary" onClick={() => history.push('/FlightList')}>Book a Flight</Button>
          <Button color="primary" onClick={() => history.push('/FlightTracker')}>Flight tracker</Button>

          <ClickAwayListener onClickAway={handleClose}>
            <MenuItem onClick={handleProfileMenuOpen}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="primary"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={isProfileMenuOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{t('menuappbar.profile')}</MenuItem>
                <MenuItem onClick={handleClose}>{t('menuappbar.my account')}</MenuItem>
                <MenuItem onClick={handleLogout}>{t("menuappbar.logout")}</MenuItem>
              </Menu>
            </MenuItem>
          </ClickAwayListener>
          <LanguageSelector />
        </Toolbar>
      </AppBar>
    </div>
  );
}
