import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 1:', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: /Home/i });
    const secondLink = screen.getByRole('link', { name: /About/i });
    const thirdLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirdLink).toBeInTheDocument();
  });

  test('se a aplicação é direcionada para a página "/" ao clicar em Home.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const homeSubtitle = screen.getByRole(
      'heading',
      { level: 2, name: /Encountered pokémons/i },
    );
    expect(homeSubtitle).toBeInTheDocument();
  });

  test(`se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutSubtitle = screen.getByRole(
      'heading',
      { level: 2, name: /About Pokédex/i },
    );
    expect(aboutSubtitle).toBeInTheDocument();
  });

  test(`se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const favSubtitle = screen.getByRole(
      'heading',
      { level: 2, name: /Favorite pokémons/i },
    );
    expect(favSubtitle).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página
  Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/qualquercoisa');
    const notFoundSubtitle = screen.getByRole(
      'heading',
      { level: 2, name: /Page requested not found/i },
    );
    expect(notFoundSubtitle).toBeInTheDocument();
  });
});
