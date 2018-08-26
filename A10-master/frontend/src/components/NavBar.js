import React, { Component } from 'react';
import { Button, Modal, Grid, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RouteBuilder from '../helpers/RouteBuilder';

import Style from '../styles/NavBar';
import Actions from '../reducers/Actions';

const submitLogin = (credentials, login, toggleModal, setError) => {
    fetch(RouteBuilder.route('/login'), {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => {
        if (response.status === 200) {
            toggleModal();
            setError('response', 'invalidCredentials', false);
            return response.json();
        }

        setError('response', 'invalidCredentials', true);
        return null;
    }).then(body => {
        if (body) {
            login(body);
        }
    });
};

const submitRegister = (credentials, login, toggleModal, setError) => {
    fetch(RouteBuilder.route('/signup'), {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => {
        if (response.status === 200) {
            toggleModal();
            setError('response', 'taken', false);
            return response.json();
        }

        setError('response', 'taken', true);
        return null;
    }).then(body => {
        if (body) {
            login(body);
        }
    });
};

const validateInput = (field, value, setError) => {
    if (!value) {
        setError(field, 'empty', true);
    } else {
        setError(field, 'empty', false);
    }

    if (field === 'email') {
        if (!value.includes('@')) {
            setError(field, 'invalid', true);
        } else {
            setError(field, 'invalid', false);
        }
    }
};

const validatePasswords = (confirmPassword, password, setError) => {
    if (confirmPassword === password) {
        setError('confirmPassword', 'doesNotMatch', false);
    } else {
        setError('confirmPassword', 'doesNotMatch', true);
    }
};

const disableSubmit = (formErrors, formValues) => {
    const inputs = Object.keys(formErrors);

    let disable = false;

    inputs.forEach(input => {
        const errors = Object.keys(formErrors[input]);

        errors.forEach(error => {
            if (error !== 'invalidCredentials' && error !== 'taken' && formErrors[input][error]) {
                disable = true;
            }
        });
    });

    const values = Object.keys(formValues);

    values.forEach(value => {
        if (!formValues[value]) {
            disable = true;
        }
    });

    return disable;
};

const handleEmptyInputs = (field, error, key) => {
    if (error) {
        return (
            <li key={key}>
                {`${field} is empty`}
            </li>
        );
    }
};

const LoginErrors = props => {
    const {
        username,
        password,
        response
    } = props.formErrors;

    let errorMessages = [];

    let key = 0;

    if (response.invalidCredentials) {
        errorMessages.push(<li key={key++}>Your credentials are incorrect</li>);
    }

    errorMessages.push(handleEmptyInputs('Username', username.empty, key++));
    errorMessages.push(handleEmptyInputs('Password', password.empty, key++));

    errorMessages = errorMessages.filter(error => error);

    if (errorMessages.length) {
        return (
            <Grid.Row>
                <Grid.Column>
                    <ul style={Style.formErrors}>
                        {errorMessages}
                    </ul>
                </Grid.Column>
            </Grid.Row>
        );
    }

    return (
        <div/>
    );
};

const RegistrationErrors = props => {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
        response
    } = props.formErrors;

    let errorMessages = [];

    let key = 0;

    errorMessages.push(handleEmptyInputs('First name', firstName.empty, key++));
    errorMessages.push(handleEmptyInputs('Last name', lastName.empty, key++));
    errorMessages.push(handleEmptyInputs('Username', username.empty, key++));

    errorMessages.push(handleEmptyInputs('Email', email.empty, key++));

    if (email.invalid && !email.empty) {
        errorMessages.push(<li key={key++}>Email is invalid</li>);
    }

    errorMessages.push(handleEmptyInputs('Password', password.empty, key++));
    errorMessages.push(handleEmptyInputs('Confirm password', confirmPassword.empty, key++));

    if (confirmPassword.doesNotMatch) {
        errorMessages.push(<li key={key++}>Passwords do not match</li>);
    }

    if (response.taken) {
        errorMessages.push(<li key={key++}>The email or username you provided is taken</li>);
    }

    errorMessages = errorMessages.filter(error => error);

    if (errorMessages.length) {
        return (
            <Grid.Row>
                <Grid.Column>
                    <ul style={Style.formErrors}>
                        {errorMessages}
                    </ul>
                </Grid.Column>
            </Grid.Row>
        );
    }

    return (
        <div/>
    );
};

const NavbarMenu = props => {
    const {
        login,
        register,
        user
    } = props;

    if (user.loggedIn) {
        return (
            <div style={Style.navBarContainer}>
                <Link to={`account/${user.username}`}>
                    <Button
                        basic
                        color='yellow'
                        style={Style.navBarButton}
                    >
                        {`${user.firstName} ${user.lastName}`}
                    </Button>
                </Link>
                <Button
                    basic
                    color='yellow'
                    style={Style.navBarButton}
                    onClick={() => user.logout()}
                >
                    Logout
                </Button>
            </div>
        );
    }

    return (
        <div style={Style.navBarContainer}>
            <Modal
                size='mini'
                open={login.modalOpen}
                onClose={() => login.toggleModal()}
                closeIcon
                trigger={
                    <Button
                        basic
                        color='yellow'
                        style={Style.navBarButton}
                        onClick={() => login.toggleModal()}
                    >
                        Login
                    </Button>
                }
            >
                <Modal.Header>Login</Modal.Header>
                <Modal.Content>
                    <Grid columns={1}>
                        <LoginErrors formErrors={login.formErrors}/>
                        <Grid.Row>
                            <Grid.Column>
                                <Input
                                    onChange={login.setUsername}
                                    onBlur={event => validateInput('username', event.target.value, login.setError)}
                                    iconPosition='left'
                                    icon='user'
                                    fluid
                                    error={
                                        login.formErrors.username.empty ||
                                        login.formErrors.response.invalidCredentials
                                    }
                                    placeholder='Username or Email'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Input
                                    onChange={login.setPassword}
                                    onBlur={event => validateInput('password', event.target.value, login.setError)}
                                    iconPosition='left'
                                    icon='lock'
                                    type='password'
                                    fluid
                                    error={
                                        login.formErrors.password.empty ||
                                        login.formErrors.response.invalidCredentials
                                    }
                                    placeholder='Password'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column style={Style.submitButton}>
                                <Button
                                    onClick={() => submitLogin(
                                        {
                                            username: login.username.trim(),
                                            password: login.password.trim()
                                        },
                                        user.login,
                                        login.toggleModal,
                                        login.setError
                                    )}
                                    disabled={
                                        disableSubmit(
                                            login.formErrors,
                                            {
                                                username: login.username,
                                                password: login.password
                                            }
                                        )
                                    }
                                >
                                    Submit
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
            </Modal>
            <Modal
                size='tiny'
                open={register.modalOpen}
                onClose={() => register.toggleModal()}
                closeIcon
                trigger={
                    <Button
                        basic
                        color='yellow'
                        style={Style.navBarButton}
                        onClick={() => register.toggleModal()}
                    >
                        Register
                    </Button>
                }
            >
                <Modal.Header>Register</Modal.Header>
                <Modal.Content>
                    <Grid>
                        <RegistrationErrors formErrors={register.formErrors}/>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Input
                                    onChange={register.setFirstName}
                                    onBlur={event => validateInput('firstName', event.target.value, register.setError)}
                                    fluid
                                    error={register.formErrors.firstName.empty}
                                    placeholder='First Name'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    onChange={register.setLastName}
                                    onBlur={event => validateInput('lastName', event.target.value, register.setError)}
                                    fluid
                                    error={register.formErrors.lastName.empty}
                                    placeholder='Last Name'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Input
                                    onChange={register.setUsername}
                                    onBlur={event => validateInput('username', event.target.value, register.setError)}
                                    iconPosition='left'
                                    icon='user'
                                    fluid
                                    error={register.formErrors.username.empty || register.formErrors.response.taken}
                                    placeholder='Username'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Input
                                    onChange={register.setEmail}
                                    onBlur={event => validateInput('email', event.target.value, register.setError)}
                                    iconPosition='left'
                                    icon='mail'
                                    fluid
                                    error={
                                        register.formErrors.email.empty ||
                                        register.formErrors.email.valid ||
                                        register.formErrors.response.taken
                                    }
                                    placeholder='Email'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Input
                                    onChange={register.setPassword}
                                    onBlur={event => validateInput('password', event.target.value, register.setError)}
                                    iconPosition='left'
                                    icon='lock'
                                    type='password'
                                    fluid
                                    error={register.formErrors.password.empty}
                                    placeholder='Password'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Input
                                    onChange={register.setConfirmPassword}
                                    onBlur={event => {
                                        validateInput('confirmPassword', event.target.value, register.setError);
                                        validatePasswords(event.target.value, register.password, register.setError);
                                    }}
                                    iconPosition='left'
                                    icon='lock'
                                    type='password'
                                    fluid
                                    error={
                                        register.formErrors.confirmPassword.empty ||
                                        register.formErrors.confirmPassword.doesNotMatch
                                    }
                                    placeholder='Confirm Password'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column style={Style.submitButton}>
                                <Button
                                    onClick={() => submitRegister(
                                        {
                                            username: register.username.trim(),
                                            email: register.email.trim(),
                                            password: register.password.trim(),
                                            firstName: register.firstName.trim(),
                                            lastName: register.lastName.trim()
                                        },
                                        user.login,
                                        register.toggleModal,
                                        register.setError
                                    )}
                                    disabled={
                                        disableSubmit(
                                            register.formErrors,
                                            {
                                                username: register.username,
                                                firstName: register.firstName,
                                                lastName: register.lastName,
                                                email: register.email,
                                                password: register.password,
                                                confirmPassword: register.confirmPassword
                                            }
                                        )
                                    }
                                >
                                    Submit
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
            </Modal>
        </div>
    );
};

export class HomePage extends Component {
    render() {
        const {
            login,
            register,
            user
        } = this.props;

        return (
            <div>
                <NavbarMenu login={login} register={register} user={user}/>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        login: {
            username: state.login.username,
            password: state.login.password,
            modalOpen: state.login.modalOpen,
            formErrors: state.login.formErrors
        },
        register: {
            username: state.register.username,
            email: state.register.email,
            password: state.register.password,
            confirmPassword: state.register.confirmPassword,
            firstName: state.register.firstName,
            lastName: state.register.lastName,
            modalOpen: state.register.modalOpen,
            formErrors: state.register.formErrors
        },
        user: {
            firstName: state.user.firstName,
            lastName: state.user.lastName,
            email: state.user.email,
            username: state.user.username,
            loggedIn: state.user.loggedIn
        }
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        login: {
            setUsername: event => {
                const action = {
                    type: Actions.login.setUsername,
                    value: event.target.value
                };

                dispatch(action);
            },
            setPassword: event => {
                const action = {
                    type: Actions.login.setPassword,
                    value: event.target.value
                };

                dispatch(action);
            },
            toggleModal: () => {
                const action = {
                    type: Actions.login.toggleModal
                };

                dispatch(action);
            },
            setError: (input, error, value) => {
                const action = {
                    type: Actions.login.setFormError,
                    input,
                    error,
                    value
                };

                dispatch(action);
            }
        },
        register: {
            setUsername: event => {
                const action = {
                    type: Actions.register.setUsername,
                    value: event.target.value
                };

                dispatch(action);
            },
            setEmail: event => {
                const action = {
                    type: Actions.register.setEmail,
                    value: event.target.value
                };

                dispatch(action);
            },
            setPassword: event => {
                const action = {
                    type: Actions.register.setPassword,
                    value: event.target.value
                };

                dispatch(action);
            },
            setConfirmPassword: event => {
                const action = {
                    type: Actions.register.setConfirmPassword,
                    value: event.target.value
                };

                dispatch(action);
            },
            setFirstName: event => {
                const action = {
                    type: Actions.register.setFirstName,
                    value: event.target.value
                };

                dispatch(action);
            },
            setLastName: event => {
                const action = {
                    type: Actions.register.setLastName,
                    value: event.target.value
                };

                dispatch(action);
            },
            toggleModal: () => {
                const action = {
                    type: Actions.register.toggleModal
                };

                dispatch(action);
            },
            setError: (input, error, value) => {
                const action = {
                    type: Actions.register.setFormError,
                    input,
                    error,
                    value
                };

                dispatch(action);
            }
        },
        user: {
            login: userInfo => {
                const action = {
                    type: Actions.user.login,
                    value: userInfo
                };

                dispatch(action);
            },
            logout: () => {
                const action = {
                    type: Actions.user.logout
                };

                dispatch(action);
            }
        }
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, {
        login: Object.assign({}, stateProps.login, dispatchProps.login),
        register: Object.assign({}, stateProps.register, dispatchProps.register),
        user: Object.assign({}, stateProps.user, dispatchProps.user)
    });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomePage);
