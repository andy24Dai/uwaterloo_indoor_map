import './App.css';
import './Pathing.js';
import React, { useEffect, useState } from 'react';
import getPath, { getGraph } from './Pathing.js';

function BuildDropdown({ prompt, options, selectedOption, setSelectedOption }) {

  const handleChange = (e) => setSelectedOption(e.target.value);

  return (<div className=" grid place-content-ceneter text-slate-50 pb-2">
    <label className="" htmlFor="dropdown">{prompt}:</label>
    <select className="pl-2 bg-slate-500 rounded-md w-40" id="dropdown" value={selectedOption} onChange={handleChange}>
      <option className="bg-slate-500 text-slate-50" value="" disabled>-- Select an option --</option>
      {options.map((option, index) => (
        <option className="bg-slate-500" key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
  );
}

function GetOutput({ start, end }) {
  const [opPath, setOpPath] = useState([]);
  const handleChange = () => {
    const newPath = getPath(start, end);
    setOpPath(newPath)
  };

  useEffect(() => { handleChange(); }, [start, end]);

  return (<div >
    <header>Path:</header>
    <ul className="bg-slate-500 rounded-md w-40">
      {opPath.map((dest) => <li className="pl-2" key={dest}>{dest}</li>)}
    </ul>
  </div>
  );

}

function App() {
  const buildings = Object.keys(getGraph());
  const [startSelect, setStart] = useState('');
  const [endSelect, setEnd] = useState('');

  return (
    <div className="w-screen h-screen aspect-auto bg-slate-800 text-slate-50 font-mono">
      <header className="pt-6 pb-2 grid place-content-center text-2xl font-bold font-mono tracking-wide">NO GRASS?</header>
      <div className="grid place-content-center">
        <div className="grid-cols-2 place-content-around">
        <BuildDropdown
          prompt='Starting Location'
          options={buildings}
          selectedOption={startSelect}
          setSelectedOption={setStart} />

        <BuildDropdown
          prompt='Ending Location'
          options={buildings}
          selectedOption={endSelect}
          setSelectedOption={setEnd} />
        <GetOutput start={startSelect} end={endSelect} />
        </div>
        <img className="pt-6" src="public/map.png" alt="UW Map"></img>
      </div>
    </div>
  );
}

export default App;
