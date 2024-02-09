import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import StoreScreenModal from './StoreScreenModal';
import {Task} from '../services/stores/storesService';

describe('StoreScreenModal Component', () => {
  const mockOnClose = jest.fn();

  const mockTask: Task = {
    id: '1',
    description: 'Sample Task',
    assigned: false,
  };

  const renderComponent = (task: Task) =>
    render(
      <StoreScreenModal isVisible={true} onClose={mockOnClose} task={task} />,
    );

  it('render with assigned task', () => {
    const {getByText, getByTestId} = renderComponent({
      ...mockTask,
      assigned: true,
    });

    expect(
      getByText(
        `The task '${mockTask.description}' is already assigned, so you cannot check-in for it. Please choose another task or check back later.`,
      ),
    ).toBeTruthy();
    expect(getByTestId('closeButton')).toBeTruthy();
  });

  it('render with unassigned task', () => {
    const {getByText, getByTestId} = renderComponent(mockTask);

    expect(
      getByText(
        'Check-in failed due to API unavailability. Please try again later!',
      ),
    ).toBeTruthy();
    expect(getByTestId('closeButton')).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const {getByTestId} = renderComponent(mockTask);

    fireEvent.press(getByTestId('closeButton'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
