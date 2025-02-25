// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [workers, setWorkers] = useState([]);
  const [races, setRaces] = useState([]);
  const [corporations, setCorporations] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedCorporation, setSelectedCorporation] = useState('');

  useEffect(() => {
    // Fetch races and corporations
    axios.get('/races').then(response => setRaces(response.data));
    axios.get('/corporations').then(response => setCorporations(response.data));
  }, []);

  useEffect(() => {
    // Fetch workers with filters
    const params = {};
    if (selectedRace) params.race = selectedRace;
    if (selectedCorporation) params.corporation = selectedCorporation;
    axios.get('/workers', { params }).then(response => setWorkers(response.data));
  }, [selectedRace, selectedCorporation]);

  return (
    <div>
      <h1>Workers</h1>
      <div>
        <label>Race:</label>
        <select value={selectedRace} onChange={e => setSelectedRace(e.target.value)}>
          <option value="">All</option>
          {races.map(race => (
            <option key={race.id} value={race.id}>{race.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Corporation:</label>
        <select value={selectedCorporation} onChange={e => setSelectedCorporation(e.target.value)}>
          <option value="">All</option>
          {corporations.map(corp => (
            <option key={corp.id} value={corp.id}>{corp.name}</option>
          ))}
        </select>
      </div>
      <ul>
        {workers.map(worker => (
          <li key={worker.id}>{worker.name} - {worker.race_name} - {worker.corporation_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
