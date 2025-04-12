//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from "./components/commonComponents/ErrorBoundary"; 
// import 'bootstrap/dist/css/bootstrap.min.css';
//  import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ErrorBoundary>
    <Provider store={store}>
      
       <App />
    
    </Provider>
     </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
