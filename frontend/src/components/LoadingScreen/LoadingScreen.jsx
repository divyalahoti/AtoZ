import React from 'react';

const LoadingScreen = ({ visible }) => (
  <div className={`loading-screen ${visible ? '' : 'hidden'}`}>
    <div className="brand-name">AtoZ Jewellery</div>
    <div className="loading-bar"></div>
  </div>
);

export default LoadingScreen;
