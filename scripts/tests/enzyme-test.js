import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import SearchBar from '../components/SearchBar'
import CurrentDataDisplay from '../components/CurrentDataDisplay'

describe('test SearchBar component', () => {
    it('renders zero <CurrentDataDisplay /> components', () => {
        const wrapper = shallow(<SearchBar />)
        expect(wrapper.find(CurrentDataDisplay)).to.have.length(0)
    })

    it('simulates click events', () => {
        const onSubmit = sinon.spy();
        const wrapper = shallow(
            <SearchBar onButtonClick={onSubmit} />
        );
        
        wrapper.find('form').simulate('submit', { preventDefault: function(){} });
        expect(onSubmit).to.have.property('callCount', 1);
  });
})