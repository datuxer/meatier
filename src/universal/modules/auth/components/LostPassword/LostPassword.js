import React, {PropTypes, Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './LostPassword.css';
import meatierForm from 'universal/decorators/meatierForm/meatierForm'
import {emailPasswordReset} from '../../ducks/auth';
import {authSchemaEmail} from '../../schemas/auth';
import { Field } from 'redux-form'

const renderInput = field =>   // Define stateless component to render input and errors
  <TextField
    type={field.type}
    name={field.name}
    floatingLabelText={field.floatingLabelText}
    hintText={field.hintText}
    defaultValue={field.defaultValue}
    autoFocus
    errorText={field.meta.touched && field.meta.error || ''}
  />

@meatierForm({form: 'lostPasswordForm', schema: authSchemaEmail})
export default class LostPassword extends Component {
  static propTypes = {
    error: PropTypes.any,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    params: PropTypes.shape({
      resetToken: PropTypes.string
    }),
    location: PropTypes.shape({
      query: PropTypes.shape({
        e: PropTypes.string
      })
    })
  }
  render() {
    const {error, handleSubmit, submitting, location} = this.props;
    return (
      <div className={styles.lostPasswordForm}>
        <h3>Lost password</h3>
        <span className={styles.instructions}>Enter your email address and we'll send you a password reset link.</span>
        {error && <span>{error}</span>}
        <form className={styles.lostPasswordForm} onSubmit={handleSubmit(emailPasswordReset)}>
          <input style={{display: 'none'}} type="text" name="javascript-disabled"/>

          <Field
            name="mail"                   // Specify field name
            floatingLabelText="Email"
            hintText="name@email.com"
            defaultValue={location.query.e}
            component={renderInput}           // Specify render component above
            type="text"/>

          <input style={{display: 'none'}} type="text" name="javascript-disabled"/>
          <div className={styles.lostPasswordButton}>
            <RaisedButton
              label="Send password reset"
              secondary
              type="submit"
              disabled={submitting}
              onClick={handleSubmit(emailPasswordReset)}
            />
          </div>
        </form>
      </div>
    );
  }
}
