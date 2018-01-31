import React, { Component } from 'react';
import axios from 'axios';

import './formReset.css';
import './ArticleEditor.css';

import Thumbnail from './Thumbnail';

class ArticleEditor extends Component {
  constructor() {
    super();

    this.state = {
      editing: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.apiPost = this.apiPost.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();
    const article = this.props.articleToEdit;

    const articleObj = {
      date: article.date,
      originalTitle: article.title,
      title: this.formTitle.value,
      source: this.formSource.value,
      url: article.url,
      urlToImage: article.urlToImage
    }
    console.log(articleObj);
  }

  apiPost = async (obj) => {
    const response = await axios.post('/api/posts', obj);
    console.log(response);
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  renderStatic() {
    const article = this.props.articleToEdit;
    return(
      <div>
        <span id="article-title">{article.title}</span>
        <span id="article-source">{article.source}</span>
        <span id="article-description">{article.description}</span>
      </div>

    )
  }

  renderForm() {
    const article = this.props.articleToEdit;
    return (
      <form className="editor__form" onSubmit={(e) => this.submitForm(e)}>
        <label for="article-title"><h4>Headline</h4></label>
        <textarea id="article-title" type="text" name="article-title" value={article.originalTitle} required autoComplete="off" ref={(title) => {this.formTitle = title}}></textarea>
        <label for="article-source"><h4>Source</h4></label>
        <input id="article-source" type="text" name="article-source" value={article.source} required autoComplete="off" ref={(source) => {this.formSource = source}}  />
        <span id="article-description">{article.description}</span>
      </form>
    )
  }

  render() {
    const article = this.props.articleToEdit;

    if(!Object.keys(article).length) {
      return null;
    }

    return (
      <div className="editor">
        <div className="article">
          <Thumbnail
            class="article"
            location="editor"
            url={article.urlToImage}
          />
        { !this.state.editing ? this.renderStatic() : this.renderForm() }
        </div>
        <button className="editor__button" onClick={(e) => {this.handleClick(e)}} type="submit">Save Post</button>
      </div>
    );
  }
}

export default ArticleEditor;
