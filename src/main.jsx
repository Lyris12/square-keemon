import React from 'react';
import ReactDOM from 'react-dom/client';
import Square from './lib';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Square size={250} direction='DTL' smooth />
);
