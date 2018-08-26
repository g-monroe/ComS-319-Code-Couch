import { combineReducers } from 'redux';
import submitUser from './submitUser';
import login from './Login';
import register from './Register';
import user from './User';
import story from './AddStory';

export default combineReducers({
    login,
    register,
    user,
    submitUser,
    story
});
