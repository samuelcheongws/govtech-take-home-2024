import React, { useState } from 'react';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'

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
      <h2>Enter or Edit Match Results
        <a data-tooltip-id="my-tooltip" data-tooltip-content="After the user inputs in the data and presses submit, the inputted data will stay in the text box.
When user presses submit again, it will effectively overwrite the existing data in the box. ">
          ❓
        </a>
        <Tooltip id="my-tooltip" style={{ maxWidth: '500px', fontSize: '20px', fontWeight: "normal" }} />
      </h2>
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
