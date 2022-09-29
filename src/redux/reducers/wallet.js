// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, GET_CURRENCIES, GET_CURRENCIES_FAIL } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  error: '',
  loading: false,
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
  default:
    return state;
  }
}

export default wallet;
