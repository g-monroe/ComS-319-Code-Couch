import Actions from './Actions';

const getInitialState = () => {
    return {
        userAdd: '',
        projectAdd: ''
    };
};

const setState = (state, property, value) => {
    return Object.assign({}, state, {
        [property]: value
    });
};

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case Actions.submitUser.setuserAdd:
            return setState(state, 'userAdd', action.value);
        case Actions.submitUser.setprojectAdd:
            return setState(state, 'projectAdd', action.value);
        default:
            return state;
    }
};
