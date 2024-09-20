import React, { useState } from 'react';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'
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

      <h2>Enter or Edit Team Information    
        <a data-tooltip-id="my-tooltip" data-tooltip-content="After the user inputs in the data and presses submit, the inputted data will appear below to confirm what has been inputted.
When user presses submit again, it will effectively overwrite the existing data in the box. ">
          ❓
        </a>
        <Tooltip id="my-tooltip" style={{ maxWidth: '500px', fontSize: '20px', fontWeight: "normal" }} />
      </h2>

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
