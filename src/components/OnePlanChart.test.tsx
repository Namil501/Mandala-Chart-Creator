import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OnePlanChart from './OnePlanChart';

describe('<OnePlanChart />', () => {
  const mockUpdateData = jest.fn();
  const mockData = Array(9).fill('');

  test('renders with correct number of cells', () => {
    render(<OnePlanChart data={mockData} updateData={mockUpdateData} />);
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(9);
  });

  test('cell switches to edit mode on click', () => {
    render(<OnePlanChart data={mockData} updateData={mockUpdateData} />);
    const cell = screen.getAllByRole('cell')[0];
    fireEvent.click(cell);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('updates data on input change', () => {
    render(<OnePlanChart data={mockData} updateData={mockUpdateData} />);
    const cell = screen.getAllByRole('cell')[0];
    fireEvent.click(cell);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(mockUpdateData).toHaveBeenCalledWith(0, 'New Value');
  });

  test('exits edit mode on blur', () => {
    render(<OnePlanChart data={mockData} updateData={mockUpdateData} />);
    const cell = screen.getAllByRole('cell')[0];
    fireEvent.click(cell);

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(input).not.toBeInTheDocument();
  });

  // Additional tests can be added as needed
});
