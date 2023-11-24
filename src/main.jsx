import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import Square from './component';

const App = () => {
  return (
		<Square size='250' direction="DTL" smooth/>
	);
}
export default App;
