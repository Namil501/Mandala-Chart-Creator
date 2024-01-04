import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import MandalaChart from './components/MandalaChart'; // MandalaChart の正しいパスを指定

ReactDOM.render(
  <React.StrictMode>
    <MandalaChart />
  </React.StrictMode>,
  document.getElementById('root')
);
