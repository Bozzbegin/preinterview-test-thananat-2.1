import React, { useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [urlInput, seturlInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = async () => {
    await axios.post('http://localhost:3010/input', { url: urlInput });
    seturlInput('');
    setResult('');
  };

  const handlePrev = async () => {
    try {
      const response = await axios.get('http://localhost:3010/prev');
      setResult(response.data);
    }
    catch (error) {
      setResult('No website to previous');
    }
  };

  const handleNext = async () => {
    try {
      const response = await axios.get('http://localhost:3010/next');
      setResult(response.data);
    }
    catch (error) {
      setResult('No website to go');
    }
  };

  const handleCurrent = async () => {
    try {
      const response = await axios.get('http://localhost:3010/current');
      setResult(response.data);
    }
    catch (error) {
      setResult('No current website');
    }
  };

  const handleAll = async () => {
    try {
      const response = await axios.get('http://localhost:3010/all');
      setResult(response.data.join('\n') || 'No URLs in history');
    } catch (error) {
      console.error('Error fetching all URLs:', error.message);
    }
  };

  return (
    <div>
      <h1>HISTORY URLs WEBSITE</h1>
      <input className="input" type="text" value={urlInput} onChange={(e) => seturlInput(e.target.value)} />
      <button className="buttonIN" onClick={handleInput}>INPUT URL</button> 
      <button className="button" onClick={handlePrev}>PREVIOUS</button>
      <button className="button" onClick={handleCurrent}>CURRENT</button>
      <button className="button" onClick={handleNext}>NEXT</button>
      <button className="buttonALL" onClick={handleAll}>ALL</button>
      <div className="result">{result}</div>
    </div>
  );
  
};

export default App;
