import React, { Component } from 'react';
import axios from 'axios';
import SignUp from './SignUp';
import Home from '../Home/Home';
import styles from './Login.module.css'; 

class Login1 extends Component {
  constructor() {
    super();
    this.state = {
      in: '',
      pw: '',
      isL: true,
      isH: true,
      error: '',
      username : ''
    };
  }

  change = (e) => {
    this.setState({ in: e.target.value });
  };

  chan = (p) => {
    this.setState({ pw: p.target.value });
  };

  tp = () => {
    this.setState({ isL: !this.state.isL, error: '' });
  };

  ts = () => {
    this.setState({ isH: true, error: '' });
  };
  login = async () => {
    const { in: inputUsername, pw: password } = this.state;
  
    // Basic validation checks for empty inputs
    if (inputUsername.trim() === '' || password.trim() === '') {
      this.setState({ error: 'Please enter both username and password' });
      return;
    }
  
    try {
      // Fetching users from backend
      const response = await axios.get('http://localhost:5000/Users');
      const users = response.data;
  
      // Check if the user exists
      const user = users.find(u => u.username === inputUsername && u.password === password);
  
      if (user) {
        // If user is found, update the username in state and navigate to Home
        this.setState({ isH: false, error: '', username: inputUsername });
      } else {
        // If user is not found, show error message
        this.setState({ error: 'User not found, please sign up' });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.setState({ error: 'Data cannot be fetched' });
    }
  };
  

  render() {
    return (
      <div>
        {this.state.isH ? (
          <div>
            {this.state.isL ? (
              <div className={styles.manner}>
                <video autoPlay loop muted playsInline>
                  <source src={require('./Login.mp4')} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className={styles.loginContainer}>
                  <h1 className={styles.heading}>LOGIN</h1>
                  <div className={styles.inputGroup}>
                    <p style={{color:'white'}}>
                      Username 
                      <input
                        className={styles.inputField}
                        type='text'
                        placeholder='Enter Username'
                        value={this.state.in}
                        onChange={this.change}
                      />
                    </p>
                    <p style={{color:'white'}}>
                      Password
                      <input
                        className={styles.inputField}
                        type='password'
                        placeholder='Enter Password'
                        value={this.state.pw}
                        onChange={this.chan}
                      />
                    </p>
                  </div>
                  {this.state.error && (
                    <p className={styles.errorMessage}>{this.state.error}</p>
                  )}
                  <div>
                    <button className={styles.loginButton} onClick={this.login}>Login</button>
                  </div>
                  <div className={styles.signupLink}>
                    <p style={{color:'white'}}>
                      New registration? &nbsp;&nbsp;&nbsp;
                      <button className={styles.signupButton} onClick={this.tp}>Sign up</button>
                    </p>
                  </div>
                </div>
              </div>    
            ) : (
              <SignUp tp={this.tp} />
            )}
          </div>
        ) : (
          <Home ts={this.ts} username={this.state.username}/>
        )}
      </div>
    );
  }
}

export default Login1;
