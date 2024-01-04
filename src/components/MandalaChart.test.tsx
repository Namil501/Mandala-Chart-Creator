import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import MandalaChart from './MandalaChart';

describe('<MandalaChart />', () => {
  test('renders without crashing', () => {
    render(<MandalaChart />);
    expect(screen.getByText('Mandara Chart')).toBeInTheDocument();
  });

  test('initial state and props are set correctly', () => {
    render(<MandalaChart />);
    const tables = screen.getAllByRole('table');
    expect(tables).toHaveLength(9);
    tables.forEach((table) => {
      const cells = within(table).getAllByRole('cell');
      expect(cells).toHaveLength(9);
      cells.forEach((cell) => {
        expect(cell.textContent).toBe('');
      });
    });
  });

  test('updating a cell updates its pair correctly', () => {
    render(<MandalaChart />);
    const tables = screen.getAllByRole('table');

    const firstTable = within(tables[0]);
    const firstCell = firstTable.getAllByRole('textbox')[0] as HTMLInputElement;
    fireEvent.change(firstCell, { target: { value: 'New Value' }});

    const pairedTableIndex = 4;
    const pairedTable = within(tables[pairedTableIndex]);
    const pairedCell = pairedTable.getAllByRole('textbox')[0] as HTMLInputElement;
    expect(pairedCell.value).toBe('New Value');
  });

  // Additional tests can be added as needed
});
