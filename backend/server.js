import { createRequire } from "module";
import UpdateTeamStats from './services/UpdateTeamStats.js';
import GetTeamRankings from './services/GetTeamRankings.js';
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
    res.status(200).send('Matches processed successfully');
  } catch (error) {
    console.error('Error updating team stats AT API POST:', error);
    res.status(400).json({ error: error.message });  // Sends error to the client
  }
});


// API to retrieve rankings
app.get('/api/rankings', (req, res) => {
  res.json(GetTeamRankings(teams));
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