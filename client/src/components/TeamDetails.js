import React, { useState } from 'react';
import axios from 'axios';

function TeamDetails() {
  const [teamName, setTeamName] = useState('');
  const [teamDetails, setTeamDetails] = useState(null);

  const fetchTeamDetails = async () => {
    try {
      const { data } = await axios.get(`/api/teams/${teamName}`);
      setTeamDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Get Team Details</h2>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Enter team name"
      />
      <button onClick={fetchTeamDetails}>Get Details</button>

      {teamDetails && (
        <div>
          <p>Registration Date: {teamDetails.registrationDate}</p>
          <p>Group: {teamDetails.groupNumber}</p>
          <p>Matches Played: {teamDetails.matchesPlayed}</p>
          <p>Outcome: {teamDetails.outcome}</p>
        </div>
      )}
    </div>
  );
}

export default TeamDetails;
