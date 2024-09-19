import React, { useState } from 'react';
import axios from 'axios';

function MatchInput() {
  const [matchData, setMatchData] = useState('');

  const handleInputChange = (e) => {
    setMatchData(e.target.value);
  };

  const submitMatches = async () => {
    try {
      await axios.post('/api/matches', { matches: matchData });
      alert('Match results submitted successfully');
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || 'An unknown error occurred'}`);
    }
  };

  return (
    <div>
      <h2>Enter Match Results</h2>
      <textarea
        rows="6"
        value={matchData}
        onChange={handleInputChange}
        placeholder="Enter match data"
      />
      <button onClick={submitMatches}>Submit Matches</button>
    </div>
  );
}

export default MatchInput;
