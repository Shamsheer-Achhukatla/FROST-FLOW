import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./cursor.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
onClick={()=> {
  document.body.style.transition="0.4s";
  document.body.style.transform="scale(0.98)";
  setTimeout(()=>document.body.style.transform="scale(1)",100);
}}
    
  </React.StrictMode>

);
