import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const initialState = {
  user: {
    email: 'tryber@teste.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    editor: false,
    idToEdit: '',
    expenses: [{
      id: 0,
      value: '10',
      description: '10',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    }],
  },
};

describe('teste da pagina WalletForm', () => {
  it('testa se a pagina foi renderizadda corretamente', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const valueTotal = screen.getByText(/0\.00/i);
    expect(valueTotal).toBeInTheDocument();
    expect(valueTotal).toHaveTextContent('0.00');

    const moedaFixed = screen.getByText(/brl/i);
    expect(moedaFixed).toBeInTheDocument();
    expect(moedaFixed).toHaveTextContent('BRL');
  });
});

describe('teste se é possivel adicionar/fazer update e excluir despesas', () => {
  it('Adiciona despesa', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const emailInitialState = screen.getByText(/tryber@teste\.com/i);
    expect(emailInitialState).toBeInTheDocument();

    const inputValue = screen.getByText(/valor:/i);
    const inputDesc = screen.getByText(/descrição:/i);

    userEvent.type(inputValue, '10');
    userEvent.type(inputDesc, '10');

    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.click(buttonAdd);
  });

  it('Remove uma despesa', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const buttonRem = screen.getByTestId('delete-btn');
    expect(buttonRem).toBeInTheDocument();

    userEvent.click(buttonRem);

    const valueAtt = screen.getByText(/0\.00/i);
    expect(valueAtt).toBeInTheDocument();
  });

  it('faz o update de  uma despesa', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const buttonEdit = screen.getByRole('button', { name: /editar/i });
    expect(buttonEdit).toBeInTheDocument();

    userEvent.click(buttonEdit);

    const inputValue = screen.getByText(/valor:/i);

    userEvent.type(inputValue, 20);

    const buttonAtt = screen.getByRole('button', { name: /editar despesa/i });

    userEvent.click(buttonAtt);

    const valueConveter = screen.getByTestId('total-field');
    expect(valueConveter).toBeInTheDocument();
  });
});
