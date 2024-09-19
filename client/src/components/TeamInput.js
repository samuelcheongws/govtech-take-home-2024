import React, { useState } from 'react';
import axios from 'axios';

function TeamInput() {
  const [teamData, setTeamData] = useState('');  // For user input
  const [addedTeams, setAddedTeams] = useState([]);  // For displaying submitted teams

  // Handle input change
  const handleInputChange = (e) => {
    setTeamData(e.target.value);
  };

  // Submit teams to the backend
  const submitTeams = async () => {
    try {
      const response = await axios.post('/api/teams', { teams: teamData });
      
      // Store the added teams from the response in state
      setAddedTeams(response.data.addedTeams);
      
      alert('Teams submitted successfully');
    } catch (error) {
      console.error('Error submitting teams:', error);
    }
  };

  return (
    <div>
      <h2>Enter Team Information</h2>
      <textarea
        rows="6"
        value={teamData}
        onChange={handleInputChange}
        placeholder="Enter team data in format: TeamName DD/MM GroupNumber"
      />
      <button onClick={submitTeams}>Submit Teams</button>
      
      {/* Display the added teams */}
      {addedTeams.length > 0 && (
        <div>
          <h3>Submitted Teams:</h3>
          <ul>
            {addedTeams.map((team, index) => (
              <li key={index}>
                {team.name} - Registered: {team.regDate}, Group: {team.group}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TeamInput;
