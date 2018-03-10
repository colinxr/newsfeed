import React, { Component } from 'react';
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
    this.renderEntities = this.renderEntities.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const article = this.props.articleInfo;

    const stripTags = article.description.replace(/(<([^>]+)>)/ig,"").trim();
    const decode = this.decodeHtmlEntity(stripTags);
    const excerpt = decode.slice(0,250).trim() + '...';
    const articleImg = this.getImgUrl();

    const articleObj = {
      date: article.pubDate,
      excerpt: excerpt,
      description: stripTags,
      originalTitle: article.title,
      title: article.title,
      source: article.meta.title,
      entities: article.newsMeta.entities,
      url: article.link,
      urlToImage: articleImg
    }

    this.props.sendToEditor(articleObj);

    // this.apiPost(articleObj)
    //   .then(res => {
    //     console.log(res);
    //   }).catch(err => {
    //     console.log(err);
    //   });
  }

  apiPost = async (obj) => {
    const response = await axios.post('/api/posts', obj);
    console.log(response);
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);

    return body;
  }
  
  getImgUrl() {
    const article = this.props.articleInfo;
    let imgUrl;
    
    if (article.image.url) {
      imgUrl = article.image.url;
      return imgUrl;
    }
    
    const imgInDesc = article.description.includes('<img src=');
    if (imgInDesc) {
      const desc = article.description;
      const regex = /<img.*?src=['"](.*?)['"]/;
      const imgUrl = regex.exec(desc)[1];;
      
      return imgUrl;
    }
    
    if (article.enclosures.length) {
      let imgUrl = article.enclosures[0].url;
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
    const article = this.props.articleInfo;
    const stripTags = article.description.replace(/(<([^>]+)>)/ig,"");
    const decode = this.decodeHtmlEntity(stripTags);
    const desc = decode.slice(0,250).trim() + '...';
    
    const articleImg = this.getImgUrl();
    
    if (article.enclosures[0]) {
      const articleImg = article.enclosures[0];
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
            <h2 className="feed-entry__title article-title"><a href={article.link} className="feed-entry__title-link" target="_blank">{article.title}</a></h2>
            <div className="header__meta">
              <h4>{article.meta.title}</h4>
              {this.renderEntities()}
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

export default FeedEntry;
