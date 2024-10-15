import './App.css';
import React, { useState } from 'react';

function buildingDropdown({options}){
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (e) => setSelectedOption(e.target.value);
}

function App() {
  return (
    <div className="Main">
      <header className="Main-header">Map</header>
      <label htmlFor="start-dropdown">Starting Building:</label>
      <select id="start-dropdown" name="options">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
}

export default App;
