import React from 'react';
import Paid from '../Appointment/Paid';
import Free from '../Appointment/Free';
import Card from '../Doctor_card/Card'
function Appointment() {
  return (
    <div  className="flex justify-between">
      <Paid /> 
       <span/>
       <Free/>
    </div>
  );
}

export default Appointment;
