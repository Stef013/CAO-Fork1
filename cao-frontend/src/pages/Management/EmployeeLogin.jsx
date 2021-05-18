import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Container, CssBaseline, LinearProgress, Paper, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/styles';
import { Trans, withTranslation } from 'react-i18next';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
    },
    paperContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        paddingLeft: 40,
        paddingRight: 40,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
    },
    linearProgress: {
        width: '100%',
    }
});

class EmployeeLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
            isLoading: false,
        };
        this.handleSubmitevents = this.handleSubmitevents.bind(this);
        this.t = this.props.t;
    }

    async handleSubmitevents(event) {
        event.preventDefault();
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        }
        this.setState({
            isLoading: true,
            error: null,
        });
        let responseToken = '';
        this.props.axios.post('/account/employee/login', credentials, {
            headers: {
                "Content-Type": 'application/json', 'Accept': 'application/json'
            }
        })
            .then(res => responseToken = res.data.token)
            .catch(error => {
                console.dir(error);
                this.setState({
                    error: error.response?.data?.message || this.t('loginpage.network error'),
                });
            })
            .then(res => {
                this.setState({ isLoading: false });
                this.props.setToken(responseToken);
            });
    }

    render() {
        const { classes, t } = this.props;
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Paper className={classes.paper} >
                    {this.state.isLoading && <LinearProgress className={classes.linearProgress} color="secondary" />}
                    <div className={classes.paperContainer}>
                        {this.state.error != null && (
                            <div style={{ width: "100%", marginBottom: "1rem" }}>
                                <Alert severity="error">{this.state.error}</Alert>
                            </div>
                        )}

                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            CAO Management Portal
                        </Typography>

                        <form className={classes.form} onSubmit={this.handleSubmitevents} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={t('loginpage.email address')}
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={this.state.email}
                                onChange={(e) => { this.setState({ email: e.target.value }); }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t('loginpage.password')}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={(e) => { this.setState({ password: e.target.value }); }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                <Trans t={t} i18nKey="loginpage.Sign in" />
                        </Button>
                        </form>
                    </div>
                </Paper>
            </Container>
        );
    }
}

EmployeeLogin.propTypes = {
    classes: PropTypes.object.isRequired,
    setToken: PropTypes.func.isRequired,
};

export default withTranslation()(withStyles(styles)(EmployeeLogin));