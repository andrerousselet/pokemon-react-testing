import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Requisito 6: componente <Pokemon.js />', () => {
  test('Deve renderizar um card com as informações de determinado pokémon.',
    () => {
      pokemons.forEach((pokemon, index) => {
        renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

        const names = screen.getAllByTestId('pokemon-name');
        expect(names[index]).toBeInTheDocument();
        expect(names[index]).toHaveTextContent(pokemon.name);

        const types = screen.getAllByTestId('pokemon-type');
        expect(types[index]).toBeInTheDocument();
        expect(types[index]).toHaveTextContent(pokemon.type);

        const weights = screen.getAllByTestId('pokemon-weight');
        expect(weights[index]).toBeInTheDocument();
        const { value, measurementUnit } = pokemon.averageWeight;
        expect(weights[index]).toHaveTextContent(
          `Average weight: ${value} ${measurementUnit}`,
        );

        const images = screen.getAllByRole('img');
        expect(images[index]).toBeInTheDocument();
        expect(images[index]).toHaveAttribute('src', pokemon.image);
        expect(images[index]).toHaveAttribute('alt', `${pokemon.name} sprite`);
      });
    });

  test('Deve conter um link que redireciona para a página de detalhes deste pokémon.',
    () => {
      pokemons.forEach((pokemon, index) => {
        const { history } = renderWithRouter(
          <Pokemon pokemon={ pokemon } isFavorite={ false } />,
        );

        const detailsLink = screen.getAllByRole('link', { name: /more details/i });
        expect(detailsLink[index]).toBeInTheDocument();
        expect(detailsLink[index]).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

        userEvent.click(detailsLink[index]);
        expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
      });
    });

  test('Deve existir um ícone de estrela nos pokémons favoritados.', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

      const favStar = screen.getByRole(
        'img', { name: `${pokemon.name} is marked as favorite` },
      );
      expect(favStar).toBeInTheDocument();
      expect(favStar).toHaveAttribute('src', '/star-icon.svg');
      expect(favStar).toHaveAttribute(
        'alt', `${pokemon.name} is marked as favorite`,
      );
    });
  });
});
