import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import initializeFirebase from './Firebase';
import { BrowserRouter as Router} from 'react-router-dom';

initializeFirebase();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
