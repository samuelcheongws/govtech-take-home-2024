import { createRequire } from "module";
import UpdateTeamStats from './services/UpdateTeamStats.js';
import cors from 'cors';

const require = createRequire(import.meta.url);


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let teams = [];
let matches = [];

// API to check if server is running
app.get('/status', (req, res, next) => res.sendStatus(200));


// API to add teams
app.post('/api/teams', (req, res) => {
  const teamData = req.body.teams.split('\n').map((line) => {
    const [name, regDate, group] = line.split(' ');
    return { name, regDate, group, points: 0, goals: 0, altPoints: 0 };
  });
  teams = teams.concat(teamData);
  res.status(200).json({ addedTeams: teamData });
});

// API to add match results
app.post('/api/matches', (req, res) => {
  const matchData = req.body.matches.split('\n').map((line) => {
    const [teamA, teamB, goalsA, goalsB] = line.split(' ');
    return { teamA, teamB, goalsA: parseInt(goalsA), goalsB: parseInt(goalsB) };
  });
  // matches = matches.concat(matchData);
  try {
    UpdateTeamStats(teams, matchData);  // Updates stats based on matches
    // updateTeamStats(matchData);  // Updates stats based on matches
    res.status(200).send('Matches processed successfully');
  } catch (error) {
    console.error('Error updating team stats AT API POST:', error);
    res.status(400).json({ error: error.message });  // Sends error to the client
  }
});

const updateTeamStats = (matchData) => {
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

// API to retrieve rankings
app.get('/api/rankings', (req, res) => {
  res.json(teams);
});

// API to get details for a specific team
app.get('/api/teams/:teamName', (req, res) => {
  const team = teams.find((t) => t.name === req.params.teamName);
  res.json(team);
});

// API to clear data
app.delete('/api/data', (req, res) => {
  teams = [];
  matches = [];
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});