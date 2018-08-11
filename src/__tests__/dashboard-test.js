import React from 'react';
import Dashboard from '../components/dashboard';
import { shallow, mount } from 'enzyme';

describe('<Dashboard />', () => {
  it('Should render without crashing', () => {
    const theStore = {
      subscribe: () => {},
      dispatch: () => {},
      getState: () => ({ auth: 1 })
    };
    shallow(<Dashboard store={theStore} />);
  });
});
