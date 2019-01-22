import React, { Component } from 'react';

import validate from 'validate.js';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const initialState = {
  emailAddress: '',
  password: '',
  passwordConfirmation: '',

  errors: null
};

class SignUpDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  signUp = () => {
    const constraints = {
      emailAddress: {
        email: true,
        presence: {
          allowEmpty: false
        }
      },
      
      password: {
        length: {
          minimum: 6
        },
        presence: {
          allowEmpty: false
        }
      },

      passwordConfirmation: {
        equality: 'password',
        length: {
          minimum: 6
        },
        presence: {
          allowEmpty: false
        }
      }
    };

    const { emailAddress, password, passwordConfirmation } = this.state;
    
    const errors = validate({ emailAddress, password, passwordConfirmation }, constraints);

    if (errors) {
      this.setState({ errors });
    } else {
      this.setState({
        errors: null
      }, () => {
        this.props.signUp(emailAddress, password);
      });
    }
  };

  handleExited = () => {
    this.setState(initialState);
  };

  handleKeyPress = (event) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.signUp();
    }
  };

  handleEmailAddressChange = (event) => {
    const emailAddress = event.target.value;

    this.setState({ emailAddress });
  };

  handlePasswordChange = (event) => {
    const password = event.target.value;

    this.setState({ password });
  };

  handlePasswordConfirmationChange = (event) => {
    const passwordConfirmation = event.target.value;

    this.setState({ passwordConfirmation });
  };

  handleSignUpClick = () => {
    this.signUp();
  };

  render() {
    // Properties
    const { open, isSigningUp } = this.props;

    // Events
    const { onClose } = this.props;

    const { emailAddress, password, passwordConfirmation, errors } = this.state;

    return (
      <Dialog open={open} onClose={onClose} onExited={this.handleExited} onKeyPress={this.handleKeyPress}>
        <DialogTitle>
          Sign up for an account
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Create an account to access features that are unavailable to users who haven't signed up.
          </DialogContentText>

          <div>
            <form>
              <TextField
                autoComplete="email"
                autoFocus
                error={(errors && errors.emailAddress) ? true : false}
                fullWidth
                helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                label="E-mail address"
                margin="normal"
                onChange={this.handleEmailAddressChange}
                required
                type="email"
                value={emailAddress}
              />

              <TextField
                autoComplete="new-password"
                error={(errors && errors.password) ? true : false}
                fullWidth
                helperText={(errors && errors.password) ? errors.password[0] : ''}
                label="Password"
                margin="normal"
                onChange={this.handlePasswordChange}
                required
                type="password"
                value={password}
              />

              <TextField
                autoComplete="password"
                error={(errors && errors.passwordConfirmation) ? true : false}
                fullWidth
                helperText={(errors && errors.passwordConfirmation) ? errors.passwordConfirmation[0] : ''}
                label="Password confirmation"
                margin="normal"
                onChange={this.handlePasswordConfirmationChange}
                required
                type="password"
                value={passwordConfirmation}
              />
            </form>
          </div>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="primary" disabled={isSigningUp} onClick={this.handleSignUpClick}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SignUpDialog;