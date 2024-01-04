import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

interface OnePlanChartProps {
  data: string[];
  updateData: (cellIndex: number, value: string) => void;
}

const OnePlanChart: React.FC<OnePlanChartProps> = ({ data, updateData }) => {
  // 各セルの編集ステータス
  const [editing, setEditing] = useState<number | null>(null);

  // セルをクリックしたとき編集モードに変換
  const handleCellClick = (cellIndex: number) => {
    setEditing(editing === cellIndex ? null : cellIndex);
  };

  // 他のところをクリックした時編集モード解除
  const handleBlur = () => {
    setEditing(null);
  };

  return (
    <Table bordered style={{ marginBottom: '0px' }}>
      <tbody>
        {Array.from({ length: 3 }, (_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: 3 }, (_, colIndex) => {
              const cellIndex = rowIndex * 3 + colIndex;
              return (

                <td key={colIndex} onClick={() => handleCellClick(cellIndex)} style = {{ width: '100px', height: '100px' }}>
                  {editing === cellIndex ? (
                    <input
                      type="text"
                      style = {{ width: '100%', height: '100%' }}
                      value={data[cellIndex]}
                      onChange={(e) => updateData(cellIndex, e.target.value)}
                      onBlur={handleBlur}
                      autoFocus
                    />
                  ) : (
                    <span style = {{ width: '100px', height: '100px' }}>{data[cellIndex]}</span>
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
