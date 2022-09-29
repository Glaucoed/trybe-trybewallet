import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import { emailLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisable: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.verifyInput());
  };

  verifyInput = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const number6 = 6;
    const verifyPass = password.length >= number6;
    this.setState({ isDisable: !(verifyEmail && verifyPass) });
  };

  handleSave = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(emailLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <>
        <div>Login</div>
        <form>
          <Input
            label="Email: "
            type="email"
            onChange={ this.handleChange }
            value={ email }
            name="email"
            dataTest="email-input"

          />
          <Input
            label="Password: "
            type="password"
            onChange={ this.handleChange }
            value={ password }
            name="password"
            dataTest="password-input"

          />
          <button
            type="submit"
            disabled={ isDisable }
            onClick={ this.handleSave }
          >
            Entrar
          </button>

        </form>
      </>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

};

export default connect()(Login);
