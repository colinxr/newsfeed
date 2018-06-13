import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './formReset.css';
import './ArticleEditor.css';

import Thumbnail from '../Thumbnail/Thumbnail';

class ArticleEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      post: null,
      message: null
    }

    // this.handleTitle    = this.handleTitle.bind(this);
    this.handleEdit     = this.handleEdit.bind(this);
    this.handleSave     = this.handleSave.bind(this);
    this.handlePublish  = this.handlePublish.bind(this);
    this.renderEntities = this.renderEntities.bind(this);
    this.renderStatic   = this.renderStatic.bind(this);
    this.renderForm     = this.renderForm.bind(this);
    this.renderButton   = this.renderButton.bind(this);
    this.renderMessage  = this.renderMessage.bind(this);
    this.apiPost        = this.apiPost.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.post !== nextProps.articleToEdit) {
      this.setState({
        post: nextProps.articleToEdit,
        message: null
      });
    }
  }

  // handleTitle = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     post: { title: e.target.value }
  //   });
  // }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({
      editing: true
    });
  }

  handleSave = (e) => {
    e.preventDefault();

    const { post } = this.state;

    post.title   = this.formTitle.value;
    post.source  = this.formSource.value;
    post.excerpt = this.formExcerpt.value;

    const entitiesArray = this.formEntities.value.split(',').map(el => el.trim());
    post.entities = entitiesArray;

    this.setState({
      post: post,
      editing: false,
    });
  }

  handlePublish = (e) => {
    e.preventDefault();
    if (this.state.editing === true) this.setState({ editing : false });

    this.apiPost(this.state.post);
    this.props.clearEditor();
  }

  apiPost = async (obj) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, obj);
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);
    this.setState({
      post: null,
      message: response.data.message
    });

    return body;
  }

  renderStatic() {
    const post = this.state.post;
    return(
      <div>
        <div>
          <h3 id="article-title">{post.title}</h3>
          <h4 id="article-source">{post.source}</h4>
          <p id="article-description">{post.excerpt}</p>
          {this.renderEntities()}
        </div>
        {this.renderButton()}
      </div>
    )
  }

  renderForm() {
    const post = this.state.post;
    return (
      <div>
        <form className="editor__form" onSubmit={(e) => this.submitForm(e)}>
          <textarea id="article-title" type="text" name="article-title" defaultValue={post.originalTitle} required autoComplete="off" ref={(title) => {this.formTitle = title}}></textarea>
          <input id="article-source" type="text" name="article-source" defaultValue={post.source} required autoComplete="off" ref={(source) => {this.formSource = source}}  />
          <textarea id="article-description" type="text" name="article-description" defaultValue={post.excerpt} required autoComplete="off" ref={(desc) => {this.formExcerpt = desc}}></textarea>
          {this.renderEntities()}
        </form>
        {this.renderButton()}
      </div>
    )
  }

  renderButton() {
    if (!this.state.editing) {
      return (
        <button className="editor__button" onClick={(e) => {this.handleEdit(e)}} type="submit">Edit Post</button>
      )
    } else {
      return (
        <button className="editor__button" onClick={(e) => {this.handleSave(e)}} type="submit">Save Post</button>
      )
    }
  }

  renderEntities() {
    const entities = this.state.post.entities;

    if (!this.state.editing){
      return(
        <ul id="article-entities">{
          entities.map((item, i) => <li key={i}><p>{item}</p></li>)
          }
        </ul>
      )
    } else {
      const editEntities = entities.join(', ');
      return(
        <input id="article-entities" type="text" name="article-entities" defaultValue={editEntities} ref={(entities) => this.formEntities = entities} />
      )
    }
  }

  renderMessage() {
    return (
      <div>
        <h2>{this.state.message}</h2>
      </div>
    )
  }

  render() {
    const { post, message, editing } = this.state;

    if (post === null && message === null) return null;

    if (post === null && message !== null) return this.renderMessage();

    if (Object.keys(post).length) {
      return (
        <div className="editor">
          <div className="article">
            <Thumbnail
              class="article"
              location="editor"
              url={post.urlToImage}
            />
            {!editing ? this.renderStatic() : this.renderForm()}
          </div>
          <button className="editor__button" onClick={(e) => {this.handlePublish(e)}} type="submit">Publish Post</button>
        </div>
      );
    }

    return null;
  }
}

ArticleEditor.propTypes = {
	articleToEdit: PropTypes.array.isRequired,
	clearEditor: PropTypes.func.isRequired,
}

export default ArticleEditor;
