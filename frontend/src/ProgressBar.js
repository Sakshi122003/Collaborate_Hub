import React from 'react';

const ProgressBar = ({ step }) => {
  return (
    <div className="progress-bar">
      <div className={`step ${step >= 1 ? 'active' : ''}`}>
        <span>1</span>
        <p>Personal Data</p>
      </div>
      <div className="progress-line"></div>
      <div className={`step ${step >= 2 ? 'active' : ''}`}>
        <span>2</span>
        {/* <p>Company Details</p> */}
      </div>
    </div>
  );
};

export default ProgressBar;