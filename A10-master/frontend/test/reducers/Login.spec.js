import { expect } from 'chai';
import Chance from 'chance';

import Login from '../../src/reducers/Login';
import Actions from '../../src/reducers/Actions';

const getRandomState = () => {
    const chance = Chance();

    return {
        username: chance.string(),
        password: chance.string()
    };
}

describe('Login reducer', () => {
    let chance;
    let randomState;

    beforeEach(() => {
        chance = Chance();
        randomState = getRandomState();
    });

    it('returns the initial state', () => {
        const expectedState = {
            username: '',
            password: ''
        },
            actualState = Login(undefined, { type: chance.string() });

        expect(expectedState).to.deep.equal(actualState);
    });

    it('sets username', () => {
        const username = chance.string();
        const expectedState = Object.assign({}, randomState, {
            username
        });
        const action = { 
            type: Actions.login.setUsername,
            value: username
        };
        const actualState = Login(randomState, action);
        
        expect(expectedState).to.deep.equal(actualState);
    });

    it('sets password', () => {
        const password = chance.string(),
            expectedState = Object.assign({}, randomState, {
                password
            }),
            action = {
                type: Actions.login.setPassword,
                value: password
            },
            actualState = Login(randomState, action);

        expect(expectedState).to.deep.equal(actualState);
    })

    it('returns state for other actions', () => {
        const expectedState = { [chance.string]: chance.string },
            randomAction = {
                type: chance.natural
            },
            actualState = Login(expectedState, randomAction);
        
        expect(expectedState).to.deep.equal(actualState);
    });
});
