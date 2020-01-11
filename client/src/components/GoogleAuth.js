import React, { Component } from 'react';

class GoogleAuth extends Component {
  state = { isSignedIn: null };
  
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '627647074432-glf90nmj3kitkc03ing8rfp9knatjtvi.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    })
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }

  renderAuthBtn() {
    if (this.state.isSignedIn === null) {
      return <div>I don't know where we sign in or not -_-</div>
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon'></i>
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className='ui green google button'>
          <i className='google icon'></i>
          Sign In with Google
        </button>
      )
    }
  }

  render() {
    return (
      <div>{this.renderAuthBtn()}</div>
    );
  }
}

export default GoogleAuth;
