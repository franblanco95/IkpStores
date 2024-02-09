import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import StoreTasks from './StoreTasks';

const mockTasks = [
  {id: '1', description: 'Task 1', assigned: false},
  {id: '2', description: 'Task 2', assigned: true},
];

describe('StoreTasks Component', () => {
  const mockOnCheckin = jest.fn();
  it('renders tasks correctly', () => {
    const {getByText} = render(
      <StoreTasks tasks={mockTasks} onCheckin={mockOnCheckin} />,
    );

    expect(getByText('Task 1 - Unassigned')).toBeTruthy();
    expect(getByText('Task 2 - Assigned')).toBeTruthy();
  });

  it('calls onCheckin when a task is pressed', () => {
    const {getByText} = render(
      <StoreTasks tasks={mockTasks} onCheckin={mockOnCheckin} />,
    );

    fireEvent.press(getByText('Task 1 - Unassigned'));

    expect(mockOnCheckin).toHaveBeenCalledWith(mockTasks[0]);
    expect(mockOnCheckin).not.toHaveBeenCalledWith(mockTasks[1]);
  });
});
