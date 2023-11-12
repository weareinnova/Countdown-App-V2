import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import Atlaskit's CSS reset to ensure consistent styling across browsers
import '@atlaskit/css-reset';

// Render the main App component inside the root element of the HTML document
ReactDOM.render(
  // Enable React StrictMode for additional development checks
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // Mount the rendered component into the HTML element with the id 'root'
  document.getElementById('root')
);
