import Actions from './Actions';

const getInitialState = () => {
    return {
        title: '',
        story: '',
        storyData: [],
        hasStoryData: false
    };
};


export default (state = getInitialState(), action) => {
    switch (action.type) {
        case Actions.story.addCard:
            return Object.assign({}, state, action.value);
        case Actions.story.fetchCards:
            return Object.assign({}, state, {
                storyData: action.value,
                hasStoryData: true
            });
        default:
            return state;
    }
};
