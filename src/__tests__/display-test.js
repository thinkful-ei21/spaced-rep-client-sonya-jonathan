import React from 'react';
import Display from '../components/display';
import { shallow, mount } from 'enzyme';

describe('<Display />', () => {
  it('Should render without crashing', () => {
    const theStore = {
      subscribe: () => {},
      dispatch: () => {},
      getState: () => ({ test: { streak: 1 } })
    };
    shallow(<Display store={theStore} />);
  });
});
