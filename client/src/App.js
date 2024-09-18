import React, { useEffect, useState } from 'react';
import TeamInput from './components/TeamInput';
import MatchInput from './components/MatchInput';
import Ranking from './components/Ranking';
import TeamDetails from './components/TeamDetails';
import EditData from './components/EditData';
import axios from 'axios';

function App() {
  const [data, setData] = useState("");
  const getData=async()=>{
    try{
      const {data}=await axios.get('http://localhost:5000/status');
      setData(data);
    }catch(error){
      console.error(error);
    }
  }
  useEffect(()=>{
    getData();
  },[]);

  return (
    <div className="App">
      <div>{data}</div>
      <h1>Football Championship Tracker</h1>
      
      {/* Component for entering team information */}
      <TeamInput />
      
      {/* Component for entering match results */}
      <MatchInput />
      
      {/* Component for viewing team rankings */}
      <Ranking />
      
      {/* Component for retrieving specific team details */}
      <TeamDetails />
      
      {/* Component for editing or clearing data */}
      <EditData />
    </div>
  );
}

export default App;
