import React, {PropTypes, Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './ResetPassword.css';
import meatierForm from 'universal/decorators/meatierForm/meatierForm'
import {authSchemaPassword} from '../../schemas/auth';
import {resetPassword} from '../../ducks/auth';

const renderInput = field =>   // Define stateless component to render input and errors
  <TextField
    type={field.type}
    name={field.name}
    floatingLabelText={field.floatingLabelText}
    hintText={field.hintText}
    errorText={field.meta.touched && field.meta.error || ''}
  />

@meatierForm({form: 'resetPasswordForm', fields: ['password'], schema: authSchemaPassword})
export default class ResetPassword extends Component {
  static propTypes = {
    fields: PropTypes.any,
    error: PropTypes.any,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    params: PropTypes.shape({
      resetToken: PropTypes.string
    })
  }
  render() {
    const {fields: {password}, error, handleSubmit, submitting} = this.props;
    return (
      <div className={styles.resetPasswordForm}>
        <h3>Reset your password</h3>
        <span className={styles.instructions}>Please type your new password here</span>
        {error && <span>{error}</span>}
        <form className={styles.resetPasswordForm} onSubmit={handleSubmit(this.onSubmit)}>
          <input style={{display: 'none'}} type="text" name="chromeisabitch"/>

          <Field
            name="password"
            type="password"
            component={renderInput}
            floatingLabelText="Password"
            hintText="hunter2"
          />
          <input style={{display: 'none'}} type="text" name="javascriptDisabled"/>
          <div className={styles.resetPasswordButton}>
            <RaisedButton
              label="Set new password"
              secondary
              type="submit"
              disabled={submitting}
              onClick={handleSubmit(this.onSubmit)}
            />
          </div>
        </form>
      </div>
    );
  }
  onSubmit = (data, dispatch) => {
    const {resetToken} = this.props.params;
    const outData = Object.assign({}, data, {resetToken});
    return resetPassword(outData, dispatch);
  };
}
