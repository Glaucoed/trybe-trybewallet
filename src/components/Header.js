import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    console.log(total);
    const converteMoeda = total
      .map(({ currency, value, exchangeRates }) => exchangeRates[currency].ask * value);
    const value = converteMoeda.reduce((y, x) => x + y, 0);

    return (
      <div>
        <div>
          <span data-testid="email-field">{email}</span>
        </div>
        <div>
          <span data-testid="total-field">{value.toFixed(2)}</span>
        </div>
        <div>
          <span data-testid="header-currency-field">BRL</span>
        </div>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.arrayOf(PropTypes.shape({
    arrayOf: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.expenses,

});

export default connect(mapStateToProps)(Header);
