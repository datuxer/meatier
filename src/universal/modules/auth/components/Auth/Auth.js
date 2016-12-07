import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Auth.css';
import {Link} from 'react-router';
import {loginUser, signupUser, oauthLogin} from '../../ducks/auth';
import { Field } from 'redux-form'

const renderInput = field =>   // Define stateless component to render input and errors
  <TextField
    type={field.type}
    name={field.name}
    floatingLabelText={field.floatingLabelText}
    hintText={field.hintText}
    errorText={field.meta.touched && field.meta.error || ''}
  />

const renderLink = field =>
  <Link to={{pathname: '/login/lost-password', query: {e: field.value}}} className={styles.lostPassword}>
    Forgot your password?
  </Link>

export default class Auth extends Component {
  static propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    params: PropTypes.shape({
      resetToken: PropTypes.string
    }),
    location: PropTypes.shape({
      query: PropTypes.shape({
        e: PropTypes.string,
        next: PropTypes.string
      })
    }),
    isAuthenticating: PropTypes.bool,
    isLogin: PropTypes.bool,
    authError: PropTypes.shape({
      _error: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string
    }),
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const {handleSubmit, isLogin, error, isAuthenticating, authError} = this.props;
    const localError = error || authError._error;
    /* eslint-disable react/jsx-handler-names*/
    return (
      <div className={styles.loginForm}>
        <h3>{isLogin ? 'Login' : 'Sign up'}</h3>
        {localError && <span>{localError}</span>}
        <form className={styles.loginForm} onSubmit={handleSubmit(this.onSubmit)}>
          <input style={{display: 'none'}} type="text" name="chromeisabitch"/>

          <Field
            name="mail"                   // Specify field name
            floatingLabelText="Email"
            hintText="name@email.com"
            component={renderInput}           // Specify render component above
            type="text"/>

          <input style={{display: 'none'}} type="text" name="chromeisabitch"/>

          <Field
            name="password"                   // Specify field name
            floatingLabelText="Password"
            hintText="hunter2"
            component={renderInput}           // Reuse same render component
            type="password"                // "type" prop passed to renderInput
          />

          {isLogin ? <Field component={renderLink} name="mail"/> : null}

          <div className={styles.loginButton}>
            <RaisedButton
              label={isLogin ? 'Login' : 'Sign up'}
              secondary
              type="submit"
              disabled={isAuthenticating}
              onClick={handleSubmit(this.onSubmit)}
            />

          </div>
        </form>
        <div className={styles.hrWithText}>
          <span className={styles.hrText}>or</span>
        </div>
        <span onClick={this.loginWithGoogle}>Login with Google</span>
      </div>
    );
  }
  // need async?
  loginWithGoogle = () => {
    const redirectRoute = this.props.location.query.next || '/';
    this.props.dispatch(oauthLogin('/auth/google', redirectRoute));
  };

  onSubmit = (data, dispatch) => {
    // gotta get that redirect from props
    const redirectRoute = this.props.location.query.next || '/';
    const authFunc = this.props.isLogin ? loginUser : signupUser;
    return authFunc(dispatch, data, redirectRoute);
  };
}
