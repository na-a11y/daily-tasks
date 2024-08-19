// src/App.js
import React from 'react';
import FetchDataComponent from './FetchDataComponent';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>API Fetch Example</h1>
      </header>
      <main>
        <FetchDataComponent />
      </main>
    </div>
  );
};

export default App;
