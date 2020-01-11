import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '627647074432-glf90nmj3kitkc03ing8rfp9knatjtvi.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    })
  }

  onSignInClick = () => {
    this.auth.signIn(this.auth.currentUser.get().getId());
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  }

  renderAuthBtn() {
    if (this.props.isSignedIn === null) {
      return <div>Getting status...</div>
    } else if (this.props.isSignedIn) {
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

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
