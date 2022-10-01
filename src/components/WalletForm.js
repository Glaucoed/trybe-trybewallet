import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import { addExpenses } from '../redux/actions';

const METHOD_LIST = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const TAG_LIST = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClickButton = () => {
    const { dispatch } = this.props;
    const { value, description, method, tag, currency, id } = this.state;

    const all = {
      id,
      value,
      description,
      method,
      tag,
      currency,
    };

    dispatch(addExpenses(all));

    this.setState({
      value: '',
      description: '',
      id: id + 1,
    });
  };

  render() {
    const { currencies } = this.props;
    const MOEDAS_LIST = currencies || [];

    const { value, description, method, tag, currency } = this.state;

    return (
      <form>
        <Input
          label="Valor: "
          type="number"
          onChange={ this.handleChange }
          value={ value }
          name="value"
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
          value={ tag }
          label="Categoria: "
          name="tag"
          options={ TAG_LIST }
          dataTest="tag-input"
        />
        <button
          type="button"
          onClick={ () => this.handleClickButton() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps)(WalletForm);
