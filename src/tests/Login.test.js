import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Pagina de Login', () => {
  test('verifica se a tela de login renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const title = screen.getByText(/login/i);
    const email = screen.getByText(/email:/i);
    const senha = screen.getByText(/password:/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(btnLogin).toBeDisabled();
  });

  test('verfica o processo de fazer login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByText(/email:/i);
    const passwordInput = screen.getByText(/password:/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'glauco@gmail.com');
    userEvent.type(passwordInput, '12343456');

    expect(btnLogin).toBeEnabled();

    userEvent.click(btnLogin);

    expect(history.location.pathname).toBe('/carteira');
  });
});
