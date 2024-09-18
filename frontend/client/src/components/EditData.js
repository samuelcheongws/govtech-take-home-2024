import React from 'react';
import axios from 'axios';

function EditData() {
  const clearData = async () => {
    try {
      await axios.delete('/api/data');
      alert('All data cleared');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Data</h2>
      <button onClick={clearData}>Clear All Data</button>
    </div>
  );
}

export default EditData;
