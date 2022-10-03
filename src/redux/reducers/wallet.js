// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_API,
  GET_CURRENCIES,
  GET_CURRENCIES_FAIL,
  ADD_EXPENSES,
  DELETE_EXPENSES,
  EDIT_EXPENSES,
  ADD_EXPENSE_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  currenciesAll: '',
  loading: false,
  edit: false,
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      loading: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
      loading: false,
    };
  case GET_CURRENCIES_FAIL:
    return {
      ...state,
      loading: false,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      edit: false,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expen) => expen !== action.expense),
    };
  case ADD_EXPENSE_EDIT:
    return {
      ...state,
      edit: true,
      expense: action.expense, // alterar para o ID igual o readme
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      edit: false,
      expenses: state.expenses.map((expen) => {
        if (expen.id === action.expense.id) {
          return action.expense;
        } return expen;
      }),
      // expen.id
    };
    // se for igual action
    // se nao expen
  default:
    return state;
  }
}

export default wallet;
