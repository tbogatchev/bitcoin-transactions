// src/app-client.js
import React from 'react';
import ReactDOM from 'react-dom';
import BitcoinTransactions from './components/BitcoinTransactions';

window.onload = () => {
  ReactDOM.render(<BitcoinTransactions/>, document.getElementById('main'));
};