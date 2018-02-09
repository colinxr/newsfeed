import React, { Component } from 'react';

import './Thumbnail.css';

class Thumbnail extends Component {
  render() {
    const { location, url, classname, postUrl } = this.props;

    if (location === 'editor'){
      return(
        <div className={classname + '__img-wrap img-wrap'}>
          <img src={url} alt="" />
        </div>
      )
    }

    return(
      <div className={classname + '__img-wrap img-wrap'}>
        <a href={postUrl} className={classname +  'title-link'} target="_blank"><img src={url} alt="" /></a>
      </div>
    );
  }
}

export default Thumbnail;
