import Actions from './Actions';

const getInitialState = () => {
    return {
        Title: '',
        Story: '',
    };
};

const setState = (state, property, value) => {
    return Object.assign({}, state, {
        [property]: value
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
        default:
            return state;
    }
};
