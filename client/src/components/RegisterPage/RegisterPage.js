import React, { Component } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';

class RegisterPage extends Component {
  render() {
    return (
      <div className="Register-Page">
        <header className="Admin-header">
          <h1 className="Admin-title"><a href="/">A1: NewsFeed</a></h1>
        </header>
        <div className="register-container">
          <RegisterForm />
        </div>
      </div>
    )
  }
}


export default RegisterPage
