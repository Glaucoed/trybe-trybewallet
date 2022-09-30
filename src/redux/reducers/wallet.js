// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API,
  GET_CURRENCIES,
  GET_CURRENCIES_FAIL,
  GET_CURRENCIESALL,
  ADD_CUSTOMER } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  currenciesAll: '',
  error: '',
  loading: false,
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
      erro: 'algo está errado',
    };
  case GET_CURRENCIESALL:
    return {
      ...state,
      currenciesAll: action.currenciesAll,
      loading: false,
    };
  case ADD_CUSTOMER:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}

export default wallet;
