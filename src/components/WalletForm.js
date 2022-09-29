import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';

const METHOD_LIST = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const TAG_LIST = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {

    amount: '',
    description: '',
    method: 'Dinheiro',
    category: 'Alimentação',
    currency: '',

  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const MOEDAS_LIST = currencies;

    const { amount, description, method, category, currency } = this.state;

    return (
      <div>
        <Input
          label="Valor: "
          type="number"
          onChange={ this.handleChange }
          value={ amount }
          name="amount"
          dataTest="value-input"
        />
        <Input
          label="Descrição: "
          type="text"
          onChange={ this.handleChange }
          value={ description }
          name="description"
          dataTest="description-input"
        />

        <Select
          onChange={ this.handleChange }
          value={ currency }
          label="Moeda: "
          name="currency"
          options={ MOEDAS_LIST }
          dataTest="currency-input"
        />

        <Select
          onChange={ this.handleChange }
          value={ method }
          label="Metodo de Pagamento: "
          name="method"
          options={ METHOD_LIST }
          dataTest="method-input"
        />

        <Select
          onChange={ this.handleChange }
          value={ category }
          label="Categoria: "
          name="category"
          options={ TAG_LIST }
          dataTest="tag-input"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies });

WalletForm.propTypes = {
  currencies: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
