import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './FeedEntry.css';

import Thumbnail from '../Thumbnail/Thumbnail';

class FeedEntry extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.getImgUrl = this.getImgUrl.bind(this);
    this.decodeHtmlEntity = this.decodeHtmlEntity.bind(this);
    // this.renderEntities = this.renderEntities.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { articleInfo } = this.props;

    const stripTags = articleInfo.description ? articleInfo.description.replace(/(<([^>]+)>)/ig,"").trim() : ' ';
    const decode = this.decodeHtmlEntity(stripTags);
    const excerpt = decode.slice(0,250).trim() + '...';
    const articleImg = this.getImgUrl();

    const articleObj = {
      date: articleInfo.pubDate,
      excerpt: excerpt,
      description: stripTags,
      originalTitle: articleInfo.title,
      title: articleInfo.title,
      source: articleInfo.meta.title,
      entities: articleInfo.newsMeta.entities,
      url: articleInfo.link,
      urlToImage: articleImg
    }

    this.props.sendToEditor(articleObj);
  }

  apiPost = async (obj) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, obj);
    console.log(response);
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  getImgUrl() {
    const { articleInfo } = this.props;

		if (articleInfo == undefined) return false;

    let imgUrl;

    if (articleInfo.image.url) {
      imgUrl = articleInfo.image.url;
      return imgUrl;
    }

    const imgInDesc = articleInfo.description !== null || articleInfo.description !== undefined ? articleInfo.description.includes('<img src=') : false;
    if (imgInDesc) {
      const desc = articleInfo.description;
      const regex = /<img.*?src=['"](.*?)['"]/;
      const imgUrl = regex.exec(desc)[1];;

      return imgUrl;
    }

    if (articleInfo.enclosures.length) {
      let imgUrl = articleInfo.enclosures[0].url;
      return imgUrl;
    }
  }

  decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  }

  renderEntities() {
    const entities = this.props.articleInfo.newsMeta.entities;

    return(
      <ul className="header__meta__topics">{
          entities.map((item, i) =>
            <li key={i}><p>{item}</p></li>
          )
        }</ul>
    )
  }

  render() {
    const { articleInfo } = this.props;

		if (articleInfo == null) {
			console.log("err" + articleInfo);
			return (
				<div>
					<p>There's been a weird weird error! wtfff!</p>
			</div>
			)
		}

		if (articleInfo.description === undefined || articleInfo.description === null) {
			console.log('weirdErr' + articleInfo);
			return (
				<div>
					<p>There's been a weird weird error! harumph!</p>
			</div>
			)
		}

    const stripTags = articleInfo.description !== null ? articleInfo.description.replace(/(<([^>]+)>)/ig,"").trim() : null;
    const decode = this.decodeHtmlEntity(stripTags);
    const desc = decode.slice(0,250).trim() + '...';

    const articleImg = this.getImgUrl();

    if (articleInfo.enclosures[0]) {
      const articleImg = articleInfo.enclosures[0];
    }

    return (
      <div className="feed-entry">
        <Thumbnail
          classname="feed-entry"
          location="ArticleList"
          url={articleImg}
        />
        <div className="feed-entry__body">
          <header>
            <h2 className="feed-entry__title article-title"><a href={articleInfo.link} className="feed-entry__title-link" target="_blank">{articleInfo.title}</a></h2>
            <div className="header__meta">
              <h4>{articleInfo.meta.title}</h4>
              {/*this.renderEntities()*/}
            </div>
          </header>
        <div className="feed-entry__description">
          <p>{desc}</p>
        </div>
        <div className="feed-entry__action-bar"><span className="feed-entry__action-bar__save" onClick={(e) => this.handleClick(e)}>Save</span></div>
        </div>
      </div>
    );
  }
}

FeedEntry.propTypes = {
	index: PropTypes.string,
	articleInfo: PropTypes.object.isRequired,
	sendToEditor: PropTypes.func.isRequired,
}

export default FeedEntry;
