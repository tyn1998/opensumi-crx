import React from 'react';
import './Panel.css';
import Line from './line/line';

const Panel: React.FC = () => {
  return (
    <div className="container">
      <h1>OpenSumi DevTools</h1>
      <Line height={400} />
    </div>
  );
};

export default Panel;
