import React, { Component } from 'react';
import axios from 'axios';
import styles from './SignUp.module.css';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      na: '',
      age: '',
      em: '',
      ph: '',
      us: '',
      pw: '',
      users: [], 
    };
  }
  isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  isUsernameValid = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,15}$/; 
    return usernameRegex.test(username);
  };
  
  isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  isPhoneNumberValid = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };

  isFormValid = () => {
    const { na, age, em, ph, us, pw } = this.state;
    return na.length > 3 && age > 14 && age < 65 && this.isEmailValid(em) && this.isPhoneNumberValid(ph) && this.isUsernameValid(us) && this.isPasswordValid(pw);
  };
  
  handleSignUp = () => {
    const { na, age, em, ph,us,pw} = this.state;
    axios.post('http://localhost:5000/Users', {
      name: na,
      age: age,
      email: em,
      phone: ph,
      username : us,
      password : pw
    })
    .then(response => {
      console.log('User added:', response.data);
      this.setState({ na: '', age: '', em: '', ph: '',us: '',pw : ''}, this.fetchUsers); 
    })
    .catch(error => {
      console.error('Error adding user:', error);
    });
  };

  fetchUsers = () => {
    axios.get('http://localhost:5000/Users') 
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  render() {
    return (
      <div className={styles.manner}>
        <video autoPlay loop muted playsInline>
          <source src={require('./Login.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.signupContainer}>
          <h1 className={styles.heading}>Sign Up</h1>
          <div className={styles.inputGroup}>
            <p style={{ color: 'white' }}>
              Name:
              <input
                className={styles.inputField}
                type="text"
                placeholder="Enter name"
                name="na"
                value={this.state.na}
                onChange={this.handleChange}
              />
              {this.state.na.length <= 3 && this.state.na.length > 0 && (
              <div>&nbsp;&nbsp;&nbsp;Name should be greater than 3 characters</div>
              )}
            </p>
            <p style={{ color: 'white' }}>
              Age:
              <input
                className={styles.inputField}
                type="number"
                placeholder="Enter age"
                name="age"
                value={this.state.age}
                onChange={this.handleChange}
                />
                {(this.state.age <= 14 || this.state.age >= 65) && this.state.age && (
                  <div>&nbsp;&nbsp;&nbsp;Age should be greater than 14 and lesser than 65</div>
                )}
            </p>
            <p style={{ color: 'white' }}>
              Email:
              <input
                className={styles.inputField}
                type="email"
                placeholder="Enter email"
                name="em"
                value={this.state.em}
                onChange={this.handleChange}
              />
              {(!this.isEmailValid(this.state.em) && this.state.em) && (
                <div>&nbsp;&nbsp;&nbsp;Please enter a valid email</div>
              )}
            </p>
            <p style={{ color: 'white' }}>
              Phone number:
              <input
                className={styles.inputField}
                type="tel"
                placeholder="Enter phone number"
                name="ph"
                value={this.state.ph}
                onChange={this.handleChange}
                />
                {(!this.isPhoneNumberValid(this.state.ph) && this.state.ph) && (
                  <div>&nbsp;&nbsp;&nbsp;Please enter a valid 10 digit phone number</div>
                )}
            </p>
            <p style={{ color: 'white' }}>
              Username:
              <input
                className={styles.inputField}
                type="text"
                placeholder="Enter Username"
                name="us"
                value={this.state.us}
                onChange={this.handleChange}
              />
              {!this.isUsernameValid(this.state.us) && this.state.us && (
                <div>&nbsp;&nbsp;&nbsp;Username should be 4-15 alphanumeric characters</div>
              )}
            </p>
            <p style={{ color: 'white' }}>
              Password:
              <input
                className={styles.inputField}
                type="password"
                placeholder="Enter Password"
                name="pw"
                value={this.state.pw}
                onChange={this.handleChange}
              />
              {!this.isPasswordValid(this.state.pw) && this.state.pw && (
                <div>&nbsp;&nbsp;&nbsp;Password must be at least 8 characters <br></br>&nbsp;&nbsp;&nbsp;long and include one uppercase <br></br>&nbsp;&nbsp;&nbsp;letter, one lowercase letter,<br></br>&nbsp;&nbsp;&nbsp;one digit, and one special character.</div>
              )}
            </p>
          </div>
          <div>
            <button
              className={styles.signupButton}
              onClick={() => {
                this.handleSignUp();
                this.props.tp(); 
              }}
              disabled={!this.isFormValid()}
            >
              Sign Up
            </button>
          </div>

        </div>
      </div>
    );
  }
}
