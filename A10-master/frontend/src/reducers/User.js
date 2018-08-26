import Actions from './Actions';

const getInitialState = () => {
    return {
        loggedIn: false,
        firstName: '',
        lastName: '',
        username: '',
        email: ''
    };
};

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case Actions.user.login:
            return Object.assign({}, action.value, { loggedIn: true });
        case Actions.user.logout:
            return getInitialState();
        default:
            return state;
    }
};
