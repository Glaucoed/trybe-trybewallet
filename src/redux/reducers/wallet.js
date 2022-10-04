// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_API,
  GET_CURRENCIES,
  ADD_EXPENSES,
  DELETE_EXPENSES,
  EDIT_EXPENSES,
  ADD_EXPENSE_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  editor: false,
  idToEdit: '',
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSES:
    return {
      ...state,
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
      editor: true,
      idToEdit: action.id,
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((expen) => {
        if (expen.id === action.expense.id) {
          return action.expense;
        } return expen;
      }),
    };
  default:
    return state;
  }
}

export default wallet;
