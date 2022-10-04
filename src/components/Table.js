import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, addExpenseEdit } from '../redux/actions';

class Table extends Component {
  handleRemove = (expense) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenses(expense));
  };

  handleEdit = (expense) => {
    const { dispatch } = this.props;
    dispatch(addExpenseEdit(expense.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses
              .map((expense) => {
                const {
                  value,
                  exchangeRates,
                  currency,
                  method,
                  description,
                  tag,
                  id,
                } = expense;

                const fixedCurrency = 'Real';
                const valueTotal = (+value).toFixed(2);
                const currencyName = exchangeRates[currency].name;
                const currencyValue = (+exchangeRates[currency].ask)
                  .toFixed(2);
                const convertedValueTotal = (
                  (+exchangeRates[currency].ask) * valueTotal)
                  .toFixed(2);
                return (
                  <tr key={ id }>

                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{valueTotal}</td>
                    <td>{currencyName}</td>
                    <td>{currencyValue}</td>
                    <td>{convertedValueTotal}</td>
                    <td>{fixedCurrency}</td>
                    <td>
                      <button
                        type="submit"
                        data-testid="delete-btn"
                        onClick={ () => this.handleRemove(expense) }
                      >
                        Excluir
                      </button>
                      <button
                        type="submit"
                        data-testid="edit-btn"
                        onClick={ () => this.handleEdit(expense) }
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })
          }

        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.array),
}.isRequired;

export default connect(mapStateToProps)(Table);
