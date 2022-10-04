import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('teste da pagina WalletForm', () => {
  it('testa se a pagina foi renderizadda corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);
    const title = screen.getByRole('heading', { name: /trybewallet/i });
    expect(title).toBeInTheDocument();
  });

  it('verifica se foi chamando a API', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    renderWithRouterAndRedux(<Wallet />);
    const addDespesa = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addDespesa);

    expect(global.fetch).toHaveBeenCalled();
  });
});
