import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Ranking() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const { data } = await axios.get('/api/rankings');
        setRankings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRankings();
  }, []);

  return (
    <div>
      <h2>Team Rankings</h2>
      <ul>
        {rankings.map((team) => (
          <li key={team.name}>
            {team.name}: {team.points} points, {team.goals} goals
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
