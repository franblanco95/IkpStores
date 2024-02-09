import React from 'react';
import {render} from '@testing-library/react-native';
import StoreShippingMethods from './StoreShippingMethods';

const mockShippingMethods = [
  {id: '1', name: 'Shipping Test Name', description: '3-5 business days'},
  {id: '2', name: 'Shipping Test Name2', description: '1-2 business days'},
];

describe('StoreShippingMethods Component', () => {
  it('renders shipping methods texts', () => {
    const {getByText} = render(
      <StoreShippingMethods shippingMethods={mockShippingMethods} />,
    );

    expect(getByText('Shipping Test Name:')).toBeTruthy();
    expect(getByText('Shipping Test Name2:')).toBeTruthy();

    expect(getByText('(3-5 business days)')).toBeTruthy();
    expect(getByText('(1-2 business days)')).toBeTruthy();
  });
});
