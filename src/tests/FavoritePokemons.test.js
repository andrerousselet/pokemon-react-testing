import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 3: o componente <FavoritePokemons.js />', () => {
  test(`se é exibida na tela a mensagem No favorite pokemon found,
  caso a pessoa não tenha pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/no favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  test('se são exibidos todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const checkPik = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkPik);
    expect(checkPik).toBeChecked();

    history.push('/pokemons/4');
    const checkChar = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkChar);
    expect(checkChar).toBeChecked();

    history.push('/pokemons/10');
    const checkCat = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkCat);
    expect(checkCat).toBeChecked();

    history.push('/favorites');
    const pikachu = screen.getByRole('img',
      { name: /pikachu sprite/i });
    const charmander = screen.getByRole('img',
      { name: /charmander sprite/i });
    const caterpie = screen.getByRole('img',
      { name: /caterpie sprite/i });
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
  });
});
