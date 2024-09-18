const UpdateTeamStats = (teams, matchData) => {
  // Pre-check to ensure all team names exist in the teams array before proceeding
  const missingTeams = [];
  console.log(missingTeams);

  // Check for missing teams and gather their names
  matchData.forEach(match => {
    const { teamA, teamB } = match;
    const teamAExists = teams.some(team => team.name === teamA);
    const teamBExists = teams.some(team => team.name === teamB);

    if (!teamAExists) {
      missingTeams.push(teamA);
    }
    if (!teamBExists) {
      missingTeams.push(teamB);
    }
  });

  // If there are missing teams, throw an error with the list
  if (missingTeams.length > 0) {
    throw new Error(`The following teams were not found: ${missingTeams.join(', ')}`);
  }


  // Iterate through each match and update stats
  matchData.forEach(match => {
    const { teamA, teamB, goalsA, goalsB } = match;
    const teamAStats = teams.find(team => team.name === teamA);
    const teamBStats = teams.find(team => team.name === teamB);

    // Update goals for both teams
    teamAStats.goals += goalsA;
    teamBStats.goals += goalsB;

    // Determine match outcome and update points
    if (goalsA > goalsB) {
      // Team A wins
      teamAStats.points += 3;
      teamAStats.altPoints += 5;
      teamBStats.altPoints += 1;
    } else if (goalsB > goalsA) {
      // Team B wins
      teamBStats.points += 3;
      teamBStats.altPoints += 5;
      teamAStats.altPoints += 1;
    } else {
      // It's a draw
      teamAStats.points += 1;
      teamAStats.altPoints += 3;
      teamBStats.points += 1;
      teamBStats.altPoints += 3;
    }
  });

  console.log('Team stats updated:', teams);
};
export default UpdateTeamStats;