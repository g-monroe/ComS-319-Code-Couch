import Actions from './Actions';

const getInitialState = () => {
    return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        modalOpen: false,
        formErrors: {
            firstName: {
                empty: false
            },
            lastName: {
                empty: false
            },
            username: {
                empty: false
            },
            email: {
                empty: false,
                invalid: false
            },
            password: {
                empty: false
            },
            confirmPassword: {
                empty: false,
                doesNotMatch: false
            },
            response: {
                taken: false
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
        case Actions.register.setPassword:
            return setState(state, 'password', action.value);
        case Actions.register.setUsername:
            return setState(state, 'username', action.value);
        case Actions.register.setConfirmPassword:
            return setState(state, 'confirmPassword', action.value);
        case Actions.register.setEmail:
            return setState(state, 'email', action.value);
        case Actions.register.setFirstName:
            return setState(state, 'firstName', action.value);
        case Actions.register.setLastName:
            return setState(state, 'lastName', action.value);
        case Actions.register.toggleModal:
            return setState(getInitialState(), 'modalOpen', !state.modalOpen);
        case Actions.register.setFormError:
            return setState(
                state,
                'formErrors',
                setFormError(state.formErrors, action.input, action.error, action.value)
            );
        default:
            return state;
    }
};
