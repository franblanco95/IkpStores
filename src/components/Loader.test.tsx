import React from 'react';
import {render} from '@testing-library/react-native';
import Loader from './Loader';

describe('Loader Component', () => {
  it('Render loader component', () => {
    const {getByTestId} = render(<Loader />);
    const loader = getByTestId('loader-testId');

    expect(loader).toBeDefined();
  });
});
