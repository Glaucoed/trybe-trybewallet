export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';

export const emailLogin = (payload) => ({ type: LOGIN, payload });

export const requestAPI = () => ({ type: REQUEST_API });

export const getCurrencies = (currencies) => ({ type: GET_CURRENCIES, currencies });

export const getCurrenciesFail = () => ({ type: GET_CURRENCIES_FAIL });

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currenciesAll = await response.json();
      const currencies = Object.keys(currenciesAll)
        .filter((currencie) => (currencie !== 'USDT'));
      dispatch(getCurrencies(currencies));
    } catch (error) {
      dispatch(getCurrenciesFail());
    }
  };
}
