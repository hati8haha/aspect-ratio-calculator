import React from 'react';
import ReactDOM from 'react-dom/client';
// import { HelmetProvider } from 'react-helmet-async'; // No longer needed
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      {/* <HelmetProvider> // No longer needed */}
      <App />
      {/* </HelmetProvider> // No longer needed */}
    </React.StrictMode>,
  );
}
