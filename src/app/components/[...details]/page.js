'use client';

import React from 'react';
import { useSelector } from 'react-redux';

const Details = ({ params }) => {
  console.log(params);

  return (
    <div>
      <h2>Details of Particular Task.</h2>
      <h2>Id Number: {params.details[0]}</h2>
      <ul>
        <li>Description: {params.details[1]}</li>
        <li>Due Date: {params.details[2]}</li>
      </ul>
    </div>
  );
}

export default Details;
