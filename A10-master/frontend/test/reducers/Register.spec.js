import { expect } from 'chai';
import Chance from 'chance';

import Register from '../../src/reducers/Register';
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
            email: '',
            password: '',
            confirmPassword: ''
        },
            actualState = Register(undefined, { type: chance.string() });

        expect(expectedState).to.deep.equal(actualState);
    });

    it('sets username', () => {
        const username = chance.string();
        const expectedState = Object.assign({}, randomState, {
            username
        });
        const action = {
            type: Actions.register.setUsername,
            value: username
        };
        const actualState = Register(randomState, action);

        expect(expectedState).to.deep.equal(actualState);
    });

    it('sets password', () => {
        const password = chance.string(),
            expectedState = Object.assign({}, randomState, {
                password
            }),
            action = {
                type: Actions.register.setPassword,
                value: password
            },
            actualState = Register(randomState, action);

        expect(expectedState).to.deep.equal(actualState);
    })

    it('sets email', () => {
        const email = chance.string();
        const expectedState = Object.assign({}, randomState, {
            email
        });
        const action = {
            type: Actions.register.setEmail,
            value: email
        };
        const actualState = Register(randomState, action);

        expect(expectedState).to.deep.equal(actualState);
    });

    it('sets confirm password', () => {
        const confirmPassword = chance.string(),
            expectedState = Object.assign({}, randomState, {
                confirmPassword
            }),
            action = {
                type: Actions.register.setConfirmPassword,
                value: confirmPassword
            },
            actualState = Register(randomState, action);

        expect(expectedState).to.deep.equal(actualState);
    });

    it('returns state for other actions', () => {
        const expectedState = { [chance.string]: chance.string },
            randomAction = {
                type: chance.natural
            },
            actualState = Register(expectedState, randomAction);

        expect(expectedState).to.deep.equal(actualState);
    });

});

