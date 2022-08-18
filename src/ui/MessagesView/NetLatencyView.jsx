import React from 'react';
import './NetLatencyView.scss';

const NetLatencyView = ({ capturing, latency }) => {
  if (!capturing) return null;

  return (
    <div className="netlatency">
      <div>
        <span>{latency > 999 ? '999+' : latency}</span>
      </div>
      <div>
        <span>ms</span>
      </div>
    </div>
  );
};

export default NetLatencyView;
