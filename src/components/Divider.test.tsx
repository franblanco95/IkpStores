import React from 'react';
import {render} from '@testing-library/react-native';
import Divider from './Divider';

describe('Divider Component', () => {
  it('Render divider component', () => {
    const {getByTestId} = render(<Divider />);
    const divider = getByTestId('divider-testId');

    expect(divider).toBeDefined();
  });
});
