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

    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(e){
    e.preventDefault();
    const email = this.formEmail.value;
    const password = this.formPassword.value;
		const passwordConf = this.formPasswordConf.value;

    this.setState({
      email: email,
      password: password,
			passwordConf: passwordConf,
    });

    const user = {
      email,
			password,
			passwordConf,
    }

    console.log(user);

    axios.post('/auth/users', user)
      .then(resp => {
        console.log(resp);
      })
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleRegister(e)} className="login">
        <input type="text" name="email" placeholder="Email" required ref={(input) => {this.formEmail = input}} />
				<input type="text" name="password" placeholder="Password" required ref={(input) => {this.formPassword = input}} />
				<input type="text" name="passwordConf" placeholder="Password confirmation" required ref={(input) => {this.formPasswordConf = input}} />
        <button type="submit" onClick={(e) => this.handleRegister(e)}>Register →</button>
      </form>
    )
  }
}


export default RegisterForm;
