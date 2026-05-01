import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './renderer/App';
import './renderer/styles/index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
