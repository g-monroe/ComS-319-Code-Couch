import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import App from '../src/App'

describe('(Component) App', () => {
    let wrapper;

    before(() => {
        wrapper = shallow(<App/>);
    });
    
    it('renders...', () => {
        expect(wrapper).to.have.length(1);
    });
});
