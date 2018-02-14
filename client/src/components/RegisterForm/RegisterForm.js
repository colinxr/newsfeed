import React, { Component } from 'react';
import axios from 'axios';

import './RegisterForm.css';

class RegisterForm extends Component {
  constructor(props) {
    super();

    this.state = {
      username: '',
      email: '',
      password: ''
    }

    this.userLogin = this.userLogin.bind(this);
  }

  userLogin(e){
    e.preventDefault();
    const username = this.formUsername.value;
    const email = this.formEmail.value;
    //const password = this.formPassword.value;

    this.setState({
      username: username,
      email: email,
      //password: password
    });

    const user = {
      'username': this.state.username,
      'password': this.state.email
    }

    console.log(user);

    axios.post('/api/register', user)
      .then(resp => {
        console.log(resp);
      })
  }

  render() {
    return (
      <form onSubmit={(e) => this.userLogin(e)} className="login">
        <input type="text" name="username" placeholder="username" required ref={(input) => {this.formUsername = input}} />
        <input type="text" name="email" placeholder="email" required ref={(input) => {this.formEmail = input}} />
        <button type="submit" onClick={(e) => this.userLogin(e)}>Register →</button>
      </form>
    )
  }
}


export default RegisterForm;
