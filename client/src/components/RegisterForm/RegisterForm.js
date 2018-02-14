import React, { Component } from 'react';
import axios from 'axios';

class RegisterForm extends Component {
  constructor(props) {
    this.state = {
      username: '',
      password: ''
    }

    this.userLogin = this.userLogin.bind(this);
  }

  userLogin(e){
    e.preventDefault();
    const username = this.formUsername.value;
    const email = this.formEmail.value;
    const password = this.formPassword.value;

    this.setState({
      username: username,
      email: email,
      password: password
    });

    const user = {
      'username': this.state.username
      'password': this.state.password
    }

    axios.post('/api/register', user)
      .then(resp => {
        console.log(resp);

      })
  }

  render() {
    return (
      <form onSubmit={(e) => this.userLogin(e)} className="login"></form>
      <input type="text" name="username" required ref={(input) => {this.formUsername = input}}/>
      <input type="text" name="email" required ref={(input) => {this.formEmail = input}}/>
      <input type="password" name="password" required ref={(input) => {this.formPassword = input}}/>
      <button type="submit">Register →</button>
    )
  }
}


export default RegisterForm;
