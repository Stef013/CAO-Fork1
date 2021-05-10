import React, {useState, useEffect} from "react";
import { AppBar, ClickAwayListener, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import AccountCircle from "@material-ui/icons/AccountCircle";
import logo from "../Images/logo.png";
import LanguageSelector from "./LanguageSelector";

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
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(anchorEl);
  
  // For debugging purposes:
  useEffect(() => {
    console.log(anchorEl);
  }, [anchorEl]);

  const handleClose = () => {
    console.log("Closing menu");
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleLogout = () => {
    handleClose();
    props.setToken(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src={logo} alt="Logo" className={classes.logo}></img>
          </Typography>
          {auth && (
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
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </MenuItem>
            </ClickAwayListener>
          )}

          <LanguageSelector />
        </Toolbar>
      </AppBar>
    </div>
  );
}
