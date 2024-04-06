
import React, { useState } from 'react';
import Doctor from '../Signup doctor/Doctor'
import User from '../Signup user/User'
function GetStarted()  {
  const [showForm1, setShowForm1] = useState(true);

  const Change = () => {
    setShowForm1(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={Change}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-4"
      >
      {showForm1 ? 'Doctor' : 'User'}</button>
      {showForm1 ? <User /> : <Doctor />}
    </div>
  );
}


export default GetStarted