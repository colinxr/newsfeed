import React from 'react';

import './LoadingEntry.css';

const Loading = () => {
  return (
    <div class="feed-entry--loading">
      <div class="feed-entry--loading__thumbnail">
      </div>
      <div class="feed-entry--loading__content">
         <div class="feed-entry--loading__bar-one"></div>
          <div class="feed-entry--loading__bar-two">
          </div>
        <div class="feed-entry--loading__bar-three">
        </div>
      </div>
    </div>
  );
}

export default Loading;
