import React, { Component } from 'react';
import { authenticateUser } from '../../helpers';
import { Redirect } from 'react-router-dom'
import CategoryList from '../CategoryList/CategoryList';
import ArticleList from '../ArticleList/ArticleList';
import ArticleEditor from '../ArticleEditor/ArticleEditor';

import './Admin.css';

class Admin extends Component {
  constructor() {
    super();

    this.state = {
			redirect: true,
			isLoggedIn: false,
      articleToEdit: [],
      category: 'all',
      isLoading: true,
    }

		this.setLogIn 			 = this.setLogIn.bind(this);
		this.renderAdminPage = this.renderAdminPage.bind(this);
		this.renderRedirect  = this.renderRedirect.bind(this);
    this.sendToEditor    = this.sendToEditor.bind(this);
    this.selectCat 			 = this.selectCat.bind(this);
    this.clearEditor     = this.clearEditor.bind(this);
  }

	componentWillMount() {
		console.log('authenticating');
		authenticateUser() ? this.setLogIn() : '';
	}

	setLogIn() {
		this.setState({
			isLoggedIn: true,
			redirect: false,
		});
	}

  sendToEditor = (obj) => {
    this.setState({ articleToEdit: obj });
  }

  clearEditor = () => {
    this.setState({ articleToEdit: [] });
  }

  selectCat = (category) => {
    this.setState({ category });
  }

	renderRedirect() {
		console.log(this.state);
		console.log('redirecting');
		if (this.state.redirect) {
			return <Redirect to='/register' />
	 	}
  }

	renderAdminPage() {
		return (
			<div className="Admin">
				<header className="Admin-header">
					<div className="header__wrapper">
						<h2><a href="/newsfeed">This is A1</a></h2>
					</div>
				</header>
				<div className="admin__container">
					<div>
						<CategoryList selectCat={this.selectCat} />
						<ArticleList
							category={this.state.category}
							sendToEditor={this.sendToEditor}
						/>
					</div>
					<ArticleEditor
						articleToEdit={this.state.articleToEdit}
						clearEditor={this.clearEditor}
					/>
				</div>
			</div>
		);
	}

  render() {
    const {isLoggedIn, isLoading} = this.state;

		return (
			<div className="">
				{
					isLoggedIn ? this.renderAdminPage() : this.renderRedirect()
				}
			</div>
		);
  }
}

export default Admin;
