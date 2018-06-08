import React, { Component } from 'react';
import axios from 'axios';

import './RegisterPage.css';

class RegisterPage extends Component {
	constructor() {
		super();

		this.state = {
			login: true,
			finished: false,
		}

		this.toggleForm = this.toggleForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.authApiCall = this.authApiCall.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		let user;
		const email = this.formEmail.value;
		const password = this.formPassword.value;

		if (this.state.form !== 'login') {
			const passwordConf = this.formPasswordConf.value;
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
			.then(resp => console.log(resp))
			.catch(err => alert(err));
	}

	authApiCall(user) {
		return new Promise((resolve, reject) => {
			axios.post(`${process.env.REACT_APP_API_URL}/auth/users`, user)
				.then(resp => resolve(resp))
				.catch(err => reject(err));
		})
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
      </div>
    )
  }
}

export default RegisterPage
