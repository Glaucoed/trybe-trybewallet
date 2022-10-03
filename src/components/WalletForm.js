import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import { addExpenses, editExpenses } from '../redux/actions';

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

  componentDidUpdate(_prevProps, prevState) {
    const { editor, expenses, idToEdit } = this.props;
    if (expenses && editor && prevState?.id !== expenses[idToEdit].id) {
      this.rendersInputInfo(expenses[idToEdit]);
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleEdit = () => {
    const { expenses, dispatch, idToEdit } = this.props;
    const { value, description, method, tag, currency, id } = this.state;
    const { exchangeRates } = expenses[idToEdit];
    const atualState = { value, description, method, tag, currency, id };
    atualState.exchangeRates = exchangeRates;
    dispatch(editExpenses(atualState));
    this.setState({
      value: '',
      description: '',
      id: expenses[expenses.length - 1].id + 1,
    });
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

  rendersInputInfo = (obj) => {
    this.setState({
      id: obj.id,
      value: obj.value,
      description: obj.description,
      currency: obj.currency,
      method: obj.method,
      tag: obj.tag,
    });
  };

  render() {
    const { currencies, editor } = this.props;
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
        {
          editor
            ? (
              <button
                type="button"
                onClick={ () => this.handleEdit() }
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={ () => this.handleClickButton() }
              >
                Adicionar despesa
              </button>
            )

        }

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,

});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.shape({
    length: PropTypes.number,
  }).isRequired,
  idToEdit: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
