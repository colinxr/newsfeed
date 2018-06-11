import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

import './RegisterPage.css';

class RegisterPage extends Component {
	constructor() {
		super();

		this.state = {
			login: true,
			redirect: false,
			errMessage: '',
		}

		this.toggleForm = this.toggleForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.authApiCall = this.authApiCall.bind(this);
		this.setRedirect = this.setRedirect.bind(this);
		this.setErrorMsg = this.setErrorMsg.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let user;
		const email = this.formEmail.value ? this.formEmail.value : '';
		const password = this.formPassword.value ? this.formPassword.value : '';

		if (!this.state.login) {
			const passwordConf = this.formPasswordConf.value ? this.formPasswordConf.value : '';
			user = {
				email,
				password,
				passwordConf,
			}
		} else {
			user = {
				loginEmail: email,
				loginPassword: password,
			}
		}

		this.authApiCall(user)
			.then(resp => {
				console.log(resp);
				if (resp.data.success) {
					console.log(resp.data);
					localStorage.setItem('newsFeedSession', JSON.stringify(resp.data.sessionId));
					this.setRedirect();
				} else {
					console.log(resp.data.err);
					this.setErrorMsg(resp.data.err);
				}
			})
			.catch(resp => {
				console.log(resp);

			});
	}

	authApiCall(user) {
		return new Promise((resolve, reject) => {
			axios.post(`${process.env.REACT_APP_API_URL}/auth/users`, user)
				.then(resp => resolve(resp))
				.catch(err => reject(err));
		})
	}

	setRedirect() {
	 this.setState({
		 redirect: true
	 })
 }

 setErrorMsg(msg) {
	 this.setState({errMessage: msg});
 }

 renderRedirect() {
	 if (this.state.redirect) {
		 return <Redirect to='/admin' />
	 }
 }

 renderErrorMsg() {
	 if (this.state.errMessage) {
		 return (
			 <div className="login-error">
				 <span className="login-error__text">{this.state.errMessage}</span>
			 </div>
		 )
	 }
 }

	toggleForm() {
		this.setState(prevState => ({
			login: !prevState.login,
		}))
	}

	setForm() {
		const btnText = this.state.login ? 'Register' : 'Login';
		return (
			<span className="form-toggle" onClick={() => this.toggleForm()}>{btnText}</span>
		)
	}

	renderRegistrationForm() {
		return (
			<div>
				<h2>Register</h2>
				{this.renderErrorMsg()}
				<form onSubmit={(e) => this.handleSubmit(e)} className="login">
	        <input type="text" name="email" placeholder="Email" required ref={(input) => {this.formEmail = input}} />
					<input type="text" name="password" placeholder="Password" required ref={(input) => {this.formPassword = input}} />
					<input type="text" name="passwordConf" placeholder="Password confirmation" required ref={(input) => {this.formPasswordConf = input}} />
	        <button type="submit" onClick={(e) => this.handleSubmit(e)}>Register →</button>
	      </form>
			</div>
    )
	}

	renderLoginForm() {
		return (
			<div className="">
				<h2>Log in</h2>
				{this.renderErrorMsg()}
				<form onSubmit={(e) => this.handleSubmit(e)} className="login">
					<input type="text" name="email" placeholder="Email" required ref={(input) => {this.formEmail = input}} />
					<input type="text" name="password" placeholder="Password" required ref={(input) => {this.formPassword = input}} />
					<button type="submit" onClick={(e) => this.handleSubmit(e)}>Log In →</button>
				</form>
			</div>
		)
	}

  render() {
    return (
      <div className="Register-Page">
        <header className="Admin-header">
          <h1 className="Admin-title"><a href="/">A1: NewsFeed</a></h1>
					{ this.setForm() }
        </header>
        <div className="register-container">
					{
					 !this.state.login ? this.renderRegistrationForm() : this.renderLoginForm()
					}
        </div>

				{this.renderRedirect()}

      </div>
    )
  }
}

export default RegisterPage
