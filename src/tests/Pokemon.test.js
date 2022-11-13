import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Requisito 6: componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon.',
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
});
