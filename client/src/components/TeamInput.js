import React, { useState } from 'react';
import axios from 'axios';

function TeamInput() {
  const [teamData, setTeamData] = useState('');

  const handleInputChange = (e) => {
    setTeamData(e.target.value);
  };

  const submitTeams = async () => {
    try {
      await axios.post('/api/teams', { teams: teamData });
      alert('Teams submitted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Enter Team Information</h2>
      <textarea
        rows="6"
        value={teamData}
        onChange={handleInputChange}
        placeholder="Enter team data"
      />
      <button onClick={submitTeams}>Submit Teams</button>
    </div>
  );
}

export default TeamInput;
