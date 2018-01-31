import React, { Component } from 'react';

import './Thumbnail.css';

class Thumbnail extends Component {
  render() {
    const { location, url, classname } = this.props;

    if (location === 'editor'){
      return(
        <div className={classname + '__img-wrap img-wrap'}>
          <img src={url} alt="" />
        </div>
      )
    }

    return(
      <div className={classname + '__img-wrap img-wrap'}>
        <a href={url} className={classname +  'title-link'}><img src={url} alt="" /></a>
      </div>
    );
  }
}

export default Thumbnail;
