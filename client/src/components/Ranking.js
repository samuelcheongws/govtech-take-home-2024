import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Ranking() {
  const [rankings, setRankings] = useState([]);
  
  const fetchRankings = async () => {
    try {
      const { data } = await axios.get('/api/rankings');
      setRankings(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching rankings:', error);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  return (
    <div>
      <h2>Team Rankings</h2>
      <button onClick={fetchRankings}>Obtain Ranking</button>
      <ul>
        {rankings.map((team) => (
          <li key={team.name}>
            {team.name} - {team.group}: {team.points} points, {team.goals} goals, {team.altPoints} altPoints, {team.regDate} regDate
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
