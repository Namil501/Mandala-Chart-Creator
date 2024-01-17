import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import './OnePlanChart.css';

interface OnePlanChartProps {
  data: string[];
  updateData: (cellIndex: number, value: string) => void;
}

const OnePlanChart: React.FC<OnePlanChartProps> = ({ data, updateData }) => {
  // Edit Status for Each Cell
  const [editing, setEditing] = useState<number | null>(null);

  // Convert cells to edit mode when clicked
  const handleCellClick = (cellIndex: number) => {
    setEditing(editing === cellIndex ? null : cellIndex);
  };

  // Turn off edit mode when you click anywhere else
  const handleBlur = () => {
    setEditing(null);
  };

  return (
    <Table className="tableStyle" bordered style={{ marginBottom: '0px' }}>
      <tbody>
        {Array.from({ length: 3 }, (_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: 3 }, (_, colIndex) => {
              const cellIndex = rowIndex * 3 + colIndex;
              return (

                <td key={colIndex} onClick={() => handleCellClick(cellIndex)}>
                  {editing === cellIndex ? (
                    <textarea
                      style={{ width: '100%', height: '100%', resize: 'none'}}
                      rows={3}
                      cols={50}
                      value={data[cellIndex]}
                      onChange={(e) => updateData(cellIndex, e.target.value)}
                      onBlur={handleBlur}
                      autoFocus
                    />
                  ) : (
                    <span style = {{ width: '100px', height: '100px', whiteSpace: 'pre-wrap'}}>{data[cellIndex]}</span>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OnePlanChart;
