import Actions from './Actions';

const getInitialState = () => {
    return {
        username: '',
        password: '',
        modalOpen: false,
        formErrors: {
            username: {
                empty: false
            },
            password: {
                empty: false
            },
            response: {
                invalidCredentials: false
            }
        }
    };
};

const setState = (state, property, value) => {
    return Object.assign({}, state, {
        [property]: value
    });
};

const setFormError = (formErrors, input, error, value) => {
    return Object.assign({}, formErrors, {
        [input]: Object.assign({}, formErrors[input], {
            [error]: value
        })
    });
};

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case Actions.login.setPassword:
            return setState(state, 'password', action.value);
        case Actions.login.setUsername:
            return setState(state, 'username', action.value);
        case Actions.login.loginUser:
            return setState(state, 'loggedIn', true);
        case Actions.login.toggleModal:
            return setState(getInitialState(), 'modalOpen', !state.modalOpen);
        case Actions.login.setFormError:
            return setState(
                state,
                'formErrors',
                setFormError(state.formErrors, action.input, action.error, action.value)
            );
        default:
            return state;
    }
};
