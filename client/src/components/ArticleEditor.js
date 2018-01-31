import React, { Component } from 'react';
import axios from 'axios';

import './formReset.css';
import './ArticleEditor.css';

import Thumbnail from './Thumbnail';

class ArticleEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      post: {
        date: this.props.articleToEdit.date,
        originalTitle: this.props.articleToEdit.title,
        title: this.props.articleToEdit.title,
        source: this.props.articleToEdit.source,
        url: this.props.articleToEdit.url,
        urlToImage: this.props.articleToEdit.urlToImage
      }
    }

    this.handleTitle = this.handleTitle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.apiPost = this.apiPost.bind(this);
  }

  handleTitle = (e) => {
    e.preventDefault();
    this.setState({
      post: { title: e.target.value }
    });
    console.log(this.state.post);
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({
      editing: true
    });
  }

  handleSave = (e) => {
    e.preventDefault();

    this.setState({
      post: {
        title: this.formTitle.value,
        source: this.formSource.value,
        description: this.formDesc.value
      },
      editing: false,
    });
  }

  handlePublish = (e) => {
    e.preventDefault();

    if (this.state.editing === true) this.setState({ editing : false });

    // this.setState({
    //   postToSave: articleObj
    // });

    console.log(this.state.postToSave);
  }

  apiPost = async (obj) => {
    const response = await axios.post('/api/posts', obj);
    console.log(response);
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  renderStatic() {
    const post = this.state.post;
    return(
      <div>
        <div>
          <h3 id="article-title">{post.title}</h3>
          <h4 id="article-source">{post.source}</h4>
          <p id="article-description">{post.description}</p>
        </div>
        <button className="editor__button" onClick={(e) => {this.handleEdit(e)}} type="submit">Edit Post</button>
      </div>

    )
  }

  renderForm() {
    const post = this.state.post;
    return (
      <div><form className="editor__form" onSubmit={(e) => this.submitForm(e)}>
        <textarea id="article-title" type="text" name="article-title" defaultValue={post.originalTitle} onChange={(e) => this.handleTitle(e)} required autoComplete="off" ref={(title) => {this.formTitle = title}}></textarea>
        <input id="article-source" type="text" name="article-source" defaultValue={post.source} required autoComplete="off" ref={(source) => {this.formSource = source}}  />
        <textarea id="article-description" type="text" name="article-description" defaultValue={post.description} required autoComplete="off" ref={(desc) => {this.formDesc = desc}}></textarea>
      </form>
      <button className="editor__button" onClick={(e) => {this.handleSave(e)}} type="submit">Save Post</button></div>

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
        <button className="editor__button" onClick={(e) => {this.handlePublish(e)}} type="submit">Publish Post</button>
      </div>
    );
  }
}

export default ArticleEditor;
