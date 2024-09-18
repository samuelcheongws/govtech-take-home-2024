function compareDates(dateA, dateB) {
  const [dayA, monthA] = dateA.split('/');
  const [dayB, monthB] = dateB.split('/');

  // Create Date objects by switching the format to MM/DD
  const formattedDateA = new Date(0, monthA - 1, dayA); // Use year 0 for consistency
  const formattedDateB = new Date(0, monthB - 1, dayB);

  return formattedDateA - formattedDateB; // Compare the dates
}

const GetTeamRankings = (teams) => {

  // Sort teams by group, and within each group, apply the tiebreakers
  const sortedTeams = teams.sort((teamA, teamB) => {
    // First, sort by group
    if (teamA.group !== teamB.group) {
      return teamA.group.localeCompare(teamB.group);
    }

    // Second, sort by points (descending)
    if (teamA.points !== teamB.points) {
      return teamB.points - teamA.points;
    }

    // Third, if points are tied, sort by goals (descending)
    if (teamA.goals !== teamB.goals) {
      return teamB.goals - teamA.goals;
    }

    // Fourth, if goals are tied, sort by altPoints (descending)
    if (teamA.altPoints !== teamB.altPoints) {
      return teamB.altPoints - teamA.altPoints;
    }

    // Finally, if altPoints are tied, sort by registration date (earliest first)
    return compareDates(teamA.regDate, teamB.regDate);
  });

  return sortedTeams;
};
export default GetTeamRankings;