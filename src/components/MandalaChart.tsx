import React, { useState } from 'react';
import OnePlanChart from './OnePlanChart';

const MandalaChart: React.FC = () => {
  const [cellData, setCellData] = useState<string[]>(Array(81).fill(''));

  // マンダラチャートのペアになるセルの箇所
  const pairs = new Map([
    [4, 36],
    [36, 4],
    [13, 37],
    [37, 13],
    [22, 38],
    [38, 22],
    [31, 39],
    [39, 31],
    [49, 41],
    [41, 49],
    [58, 42],
    [42, 58],
    [67, 43],
    [43, 67],
    [76, 44],
    [44, 76]
  ]);

  const updateCellData = (tableIndex: number, cellIndex: number, value: string) => {
    const globalIndex = tableIndex * 9 + cellIndex;
    const newData = [...cellData];
    newData[tableIndex * 9 + cellIndex] = value;

    const pairIndex = pairs.get(globalIndex);
    if (pairIndex !== undefined) {
      newData[pairIndex] = value;
    }

    setCellData(newData);
  };

  return (
    <div>
      <h1 className='text-center mt-5'>Mandara Chart</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0px', margin: '50px'}}>
        {Array.from({ length: 9 }).map((_, tableIndex) => (
          <div key={tableIndex}>
            <OnePlanChart
              data={cellData.slice(tableIndex * 9, tableIndex * 9 + 9)}
              updateData={(cellIndex, value) => updateCellData(tableIndex, cellIndex, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MandalaChart;
