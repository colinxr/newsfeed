import React from 'react';

import './LoadingEntry.css';

const Loading = () => {
  return (
    <div className="feed-entry--loading">
      <div className="feed-entry--loading__thumbnail">
      </div>
      <div className="feed-entry--loading__content">
         <div className="feed-entry--loading__bar-one"></div>
          <div className="feed-entry--loading__bar-two">
          </div>
        <div className="feed-entry--loading__bar-three">
        </div>
      </div>
    </div>
  );
}

export default Loading;
