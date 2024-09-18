import React, { useState } from 'react';
import axios from 'axios';

function TeamDetails() {
  const [teamName, setTeamName] = useState('');
  const [teamDetails, setTeamDetails] = useState(null);

  const fetchTeamDetails = async () => {
    try {
      const { data } = await axios.get(`/api/teams/${teamName}`);
      setTeamDetails(data);
      console.log(teamDetails);
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
          <p>Registration Date: {teamDetails.regDate}</p>
          <p>Group: {teamDetails.group}</p>
          {/* KIV the below 2. I need to ensure ranking logic is correct first. */}
          {/* <p>Matches Played: {teamDetails.matchesPlayed}</p>
          <p>Outcome: {teamDetails.outcome}</p> */}
        </div>
      )}
    </div>
  );
}

export default TeamDetails;
