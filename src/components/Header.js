import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    console.log(this.props);
    return (
      <div>
        <div>
          <span data-testid="email-field">{email}</span>
        </div>
        <div>
          <span data-testid="total-field">0</span>
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
};

const mapStateToProps = (state) => ({ email: state.user.email });

export default connect(mapStateToProps)(Header);
