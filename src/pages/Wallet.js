import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { fetchAPI } from '../redux/actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchAPI());
  }

  render() {
    return (
      <div>
        <h1>TrybeWallet</h1>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
