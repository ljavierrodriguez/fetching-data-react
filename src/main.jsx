import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

//import App from './App';
import ListTodos from './ListTodos';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<ListTodos />);