import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Ranking() {
  const [rankings, setRankings] = useState([]);

  const fetchRankings = async () => {
    try {
      const { data } = await axios.get('/api/rankings');
      setRankings(data);
    } catch (error) {
      console.error('Error fetching rankings:', error);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  const groupTeams = () => {
    return rankings.reduce((groups, team) => {
      if (!groups[team.group]) {
        groups[team.group] = [];
      }
      groups[team.group].push(team);
      return groups;
    }, {});
  };

  const groupedTeams = groupTeams();

  return (
    <div>
      <h2>Team Rankings</h2>
      <button onClick={fetchRankings}>Obtain Ranking</button>
      {Object.entries(groupedTeams).map(([group, teams]) => (
        <div key={group}>
          <h3>Group {group}</h3>
          <ul>
            {teams.map((team, index) => {
              const isHighlighted = teams.length < 4 || index < 4;
              return (
                <li key={team.name} style={{ fontWeight: isHighlighted ? 'bold' : 'normal', color: isHighlighted ? 'green' : 'white' }}>
                  {team.name} - {team.points} points, {team.goals} goals, {team.altPoints} altPoints, {team.regDate} regDate
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Ranking;
