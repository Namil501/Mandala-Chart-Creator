import React, { useRef, useState, useEffect } from 'react';
import OnePlanChart from './OnePlanChart';
import html2canvas from 'html2canvas';

const MandalaChart: React.FC = () => {
  const [cellData, setCellData] = useState<string[]>(Array(81).fill(''));

  // Cells to be paired in a mandala chart
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

  // Import data from Local Storage when components are mounted
  useEffect(() => {
    const savedData = localStorage.getItem('cellData');
    if (savedData) {
      setCellData(JSON.parse(savedData));
    }
  }, []);

  // Update Local Storage whenever userData status changes
  useEffect(() => {
    localStorage.setItem('cellData', JSON.stringify(cellData));
  }, [cellData]);

  // Update cell data
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


  const tableRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    if (!tableRef.current) {
      return;
    }
    const canvas = await html2canvas(tableRef.current);
    const image = canvas.toDataURL('image/png', 1.0);
  
    // download image
    const link = document.createElement('a');
    link.href = image;
    link.download = 'Mandara_Chart.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className='text-center mt-5'>Mandara Chart</h1>
      <button type='button' className='btn btn-primary mx-3' onClick={handleDownloadImage}>Download as Image</button>
      <div ref={tableRef} className='p-3' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0px'}}>
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
