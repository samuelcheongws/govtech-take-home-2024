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
  const teamArray = req.body.teams.split('\n');
  const teamArrayCleaned = teamArray.filter((line) => line.trim() !== '');

  const teamData = teamArrayCleaned.map((line) => {
    const [name, regDate, group] = line.split(' ');
    return { name, regDate, group, points: 0, goals: 0, altPoints: 0 };
  });
  teams = teamData;
  if (matches.length > 0) {
    try {
      UpdateTeamStats(teams, matches);  // Updates stats based on matches
      res.status(200).json({ addedTeams: teamData });
    } catch (error) {
      console.error('Error updating team stats AT API POST:', error);
      res.status(400).json({ error: error.message });  // Sends error to the client
    }
  }
  else {
    res.status(200).json({ addedTeams: teamData });
  }
  
});

// API to add match results
app.post('/api/matches', (req, res) => {
  teams = teams.map((team) => ({...team, points: 0, goals: 0, altPoints: 0 }));
  const matchArray = req.body.matches.split('\n');
  const matchArrayCleaned = matchArray.filter((line) => line.trim() !== '');
  const matchData = matchArrayCleaned.map((line) => {
    const [teamA, teamB, goalsA, goalsB] = line.split(' ');
    return { teamA, teamB, goalsA: parseInt(goalsA), goalsB: parseInt(goalsB) };
  });
  try {
    UpdateTeamStats(teams, matchData);  // Updates stats based on matches
    res.status(200).send('Matches processed successfully');
    matches = matchData;
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