// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');


// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.json());
// // Connect to MongoDB
// mongoose.connect('mongodb://localhost/mern-stack-db', { useNewUrlParser: true, useUnifiedTopology: true });
// // Define routes and middleware
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const todoSchema = new mongoose.Schema({
//   task: String,
//   completed: Boolean,
// });
// const Todo = mongoose.model('Todo', todoSchema);

// // Create a new todo
// app.post('/todos', async (req, res) => {
//   const newTodo = new Todo(req.body);
//   await newTodo.save();
//   res.json(newTodo);
// });
// // Update an existing todo
// app.put('/todos/:id', async (req, res) => {
//   const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updatedTodo);
// });
// // Delete a todo
// app.delete('/todos/:id', async (req, res) => {
//   await Todo.findByIdAndRemove(req.params.id);
//   res.json({ message: 'Todo deleted successfully' });
// });
import { createRequire } from "module";
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
  matches = matches.concat(matchData);
  updateTeamStats();
  res.sendStatus(200);
});

const updateTeamStats = () => {
  // Update points, goals, etc. for each team based on matches
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